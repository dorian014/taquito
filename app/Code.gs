/**
 * Taquito Instagram Post Generator
 * Main Entry Point and Routing
 */

/**
 * Serves the web app HTML
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Taquito Post Generator')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
    .setFaviconUrl('https://raw.githubusercontent.com/dorian014/taquito/main/assets/taquito_reference.png');
}

/**
 * Include HTML files (for modular templates)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Initialize the database with default data
 */
function initializeDatabase() {
  // Create sheets if they don't exist
  const ss = SpreadsheetApp.openById(getConfig().SHEET_ID);

  // Posts sheet
  let postsSheet = ss.getSheetByName('posts');
  if (!postsSheet) {
    postsSheet = ss.insertSheet('posts');
    postsSheet.getRange(1, 1, 1, 9).setValues([[
      'id', 'created_at', 'personality', 'post_type',
      'suggestion', 'final_caption', 'image_url', 'image_id', 'status'
    ]]);
  }

  // Personalities sheet
  let personalitiesSheet = ss.getSheetByName('personalities');
  if (!personalitiesSheet) {
    personalitiesSheet = ss.insertSheet('personalities');
    personalitiesSheet.getRange(1, 1, 1, 5).setValues([[
      'id', 'name', 'emoji', 'prompt', 'is_custom'
    ]]);

    // Add default personalities
    const personalityData = DEFAULT_PERSONALITIES.map(p => [
      p.id, p.name, p.emoji, p.prompt, p.isCustom
    ]);
    personalitiesSheet.getRange(2, 1, personalityData.length, 5).setValues(personalityData);
  }

  // Settings sheet
  let settingsSheet = ss.getSheetByName('settings');
  if (!settingsSheet) {
    settingsSheet = ss.insertSheet('settings');
    settingsSheet.getRange(1, 1, 1, 2).setValues([['key', 'value']]);
  }

  return { success: true, message: 'Database initialized' };
}

/**
 * Get all personalities
 */
function getPersonalities() {
  return SheetsDB.getPersonalities();
}

/**
 * Get all topics
 */
function getTopics() {
  return DEFAULT_TOPICS;
}

/**
 * Generate suggestions based on personality and topic
 */
function generateSuggestions(personalityId, customPrompt, topicId, customTopic) {
  try {
    const personality = SheetsDB.getPersonalityById(personalityId);
    if (!personality) {
      throw new Error('Personality not found');
    }

    const promptModifier = personalityId === 'custom' ? customPrompt : personality.prompt;

    // Get topic prompt
    let topicPrompt = '';
    if (topicId && topicId !== 'random') {
      const topic = DEFAULT_TOPICS.find(t => t.id === topicId);
      if (topic) {
        topicPrompt = topicId === 'custom' ? customTopic : topic.prompt;
      }
    }

    const suggestions = SuggestionEngine.generateAllSuggestions(promptModifier, topicPrompt);

    return { success: true, suggestions: suggestions };
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Generate infographic image
 */
function generateImage(postType, personalityId, caption) {
  try {
    const personality = SheetsDB.getPersonalityById(personalityId);
    const result = ImageGenerator.generateInfographic(postType, personality.name, caption);

    if (result.success) {
      // Save to Google Sheets
      const postId = Utilities.getUuid();
      SheetsDB.savePost({
        id: postId,
        personality: personality.name,
        postType: postType,
        suggestion: caption,
        finalCaption: caption,
        imageUrl: result.imageUrl,
        imageId: result.imageId,
        status: 'generated'
      });

      return {
        success: true,
        imageUrl: result.imageUrl,
        imageId: result.imageId,
        postId: postId
      };
    } else {
      return result;
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get post history
 */
function getPostHistory(limit) {
  try {
    const posts = SheetsDB.getPosts(limit || 20);
    console.log('getPostHistory returning:', posts ? posts.length : 'null');
    return posts;
  } catch (error) {
    console.error('getPostHistory error:', error);
    return [];
  }
}

/**
 * Update post status
 */
function updatePostStatus(postId, status) {
  return SheetsDB.updatePostStatus(postId, status);
}

/**
 * Get image download URL
 */
function getImageDownloadUrl(imageId) {
  return DriveStorage.getDownloadUrl(imageId);
}

/**
 * Debug function - run this to test getPosts
 */
function testGetPosts() {
  const posts = SheetsDB.getPosts(20);
  console.log('Posts count:', posts.length);
  console.log('Posts:', JSON.stringify(posts, null, 2));
  return posts;
}
