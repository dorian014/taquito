/**
 * Taquito Instagram Post Generator
 * Nano Banana (Gemini Image Generation) Integration
 */

const ImageGenerator = {
  /**
   * Generate infographic image using Nano Banana
   */
  generateInfographic: function(postType, personalityName, caption) {
    const config = getConfig();

    // Get the Taquito reference image
    const refImage = DriveStorage.getTaquitoReferenceImage();
    if (!refImage.success) {
      return { success: false, error: 'Could not load reference image: ' + refImage.error };
    }

    // Build the image prompt
    const imagePrompt = getImagePromptTemplate(postType, personalityName, caption);

    // Prepare API request
    const url = NANO_BANANA_URL + '?key=' + config.GEMINI_API_KEY;

    const payload = {
      contents: [{
        parts: [
          { text: imagePrompt },
          {
            inlineData: {
              mimeType: refImage.mimeType,
              data: refImage.base64
            }
          }
        ]
      }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE']
      }
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    try {
      console.log('Calling Nano Banana API...');
      const response = UrlFetchApp.fetch(url, options);
      const responseCode = response.getResponseCode();
      const responseText = response.getContentText();

      if (responseCode !== 200) {
        console.error('Nano Banana API error:', responseCode, responseText);
        return { success: false, error: 'API error: ' + responseCode };
      }

      const json = JSON.parse(responseText);

      // Extract image from response
      if (json.candidates && json.candidates[0] && json.candidates[0].content) {
        const parts = json.candidates[0].content.parts;

        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            // Found image data
            const imageData = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';

            // Convert base64 to blob
            const imageBlob = Utilities.newBlob(
              Utilities.base64Decode(imageData),
              mimeType,
              'taquito_' + new Date().getTime() + '.png'
            );

            // Save to Google Drive
            const filename = 'taquito_' + postType + '_' + new Date().getTime() + '.png';
            const saveResult = DriveStorage.saveImage(imageBlob, filename);

            if (saveResult.success) {
              return {
                success: true,
                imageUrl: saveResult.imageUrl,
                imageId: saveResult.imageId,
                downloadUrl: saveResult.downloadUrl
              };
            } else {
              return { success: false, error: 'Failed to save image: ' + saveResult.error };
            }
          }
        }

        return { success: false, error: 'No image in response' };
      } else {
        console.error('Unexpected response format:', JSON.stringify(json));
        return { success: false, error: 'Unexpected response format' };
      }
    } catch (error) {
      console.error('Image generation error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Generate image with retry logic
   */
  generateWithRetry: function(postType, personalityName, caption, maxRetries) {
    maxRetries = maxRetries || 3;
    let lastError = null;

    for (let i = 0; i < maxRetries; i++) {
      console.log('Image generation attempt ' + (i + 1) + ' of ' + maxRetries);

      const result = this.generateInfographic(postType, personalityName, caption);

      if (result.success) {
        return result;
      }

      lastError = result.error;
      console.log('Attempt failed: ' + lastError);

      // Wait before retry (exponential backoff)
      if (i < maxRetries - 1) {
        Utilities.sleep(Math.pow(2, i) * 1000);
      }
    }

    return { success: false, error: 'Failed after ' + maxRetries + ' attempts: ' + lastError };
  }
};
