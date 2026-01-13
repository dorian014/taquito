/**
 * Taquito Instagram Post Generator
 * Gemini 2.5 Flash Suggestion Engine
 */

const SuggestionEngine = {
  /**
   * Call Gemini API
   */
  callGemini: function(prompt, useSearch) {
    const config = getConfig();
    const url = GEMINI_API_URL + '?key=' + config.GEMINI_API_KEY;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 1024
      }
    };

    // Add search grounding for Amsterdam/real-time content
    if (useSearch) {
      payload.tools = [{ googleSearch: {} }];
    }

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    try {
      const response = UrlFetchApp.fetch(url, options);
      const json = JSON.parse(response.getContentText());

      if (json.candidates && json.candidates[0] && json.candidates[0].content) {
        return {
          success: true,
          text: json.candidates[0].content.parts[0].text
        };
      } else {
        console.error('Unexpected Gemini response:', JSON.stringify(json));
        return { success: false, error: 'Unexpected response format' };
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Generate all 4 suggestions
   */
  generateAllSuggestions: function(personalityPrompt, topicPrompt) {
    const suggestions = [];

    // Generate each type
    const diaryResult = this.generateDiarySuggestion(personalityPrompt, topicPrompt);
    if (diaryResult.success) {
      suggestions.push({
        type: POST_TYPES.DIARY,
        text: diaryResult.text
      });
    }

    const funFactResult = this.generateFunFactSuggestion(personalityPrompt, topicPrompt);
    if (funFactResult.success) {
      suggestions.push({
        type: POST_TYPES.FUNFACT,
        text: funFactResult.text
      });
    }

    const moodResult = this.generateMoodSuggestion(personalityPrompt, topicPrompt);
    if (moodResult.success) {
      suggestions.push({
        type: POST_TYPES.MOOD,
        text: moodResult.text
      });
    }

    const amsterdamResult = this.generateAmsterdamSuggestion(personalityPrompt, topicPrompt);
    if (amsterdamResult.success) {
      suggestions.push({
        type: POST_TYPES.AMSTERDAM,
        text: amsterdamResult.text
      });
    }

    return suggestions;
  },

  /**
   * Generate diary suggestion
   */
  generateDiarySuggestion: function(personalityPrompt, topicPrompt) {
    const topicLine = topicPrompt ? `\nTOPIC: Write about ${topicPrompt}\n` : '\nTOPIC: Choose any daily dog life topic (walks, naps, meals, other dogs, pawrents, weather, couch, treats, etc.)\n';

    const prompt = `You are Taquito, a Xoloitzcuintle (Mexican hairless dog) living in Amsterdam with your pawrents.

PERSONALITY: ${personalityPrompt}
${topicLine}
Write a short Instagram caption (2-3 sentences, max 150 characters) about something that happened in your day. This is a diary entry.

At the end, add 1-3 relevant hashtags based on the caption content.

Write ONLY the caption text with hashtags. No quotes, no explanation, no markdown formatting (no asterisks or special characters). Write in first person as Taquito.`;

    return this.callGemini(prompt, false);
  },

  /**
   * Generate fun fact suggestion
   */
  generateFunFactSuggestion: function(personalityPrompt, topicPrompt) {
    const topicLine = topicPrompt ? `\nTOPIC: Relate the fun fact to ${topicPrompt} if possible\n` : '';

    const prompt = `You are Taquito, a Xoloitzcuintle (Mexican hairless dog) living in Amsterdam with your pawrents.

PERSONALITY: ${personalityPrompt}
${topicLine}
Share an interesting fun fact about Xoloitzcuintles, dogs in general, or your Aztec heritage. Make it educational but entertaining.

Write a short Instagram caption (2-3 sentences, max 180 characters) that shares this fact in your personality style.

At the end, add 1-3 relevant hashtags based on the caption content.

Write ONLY the caption text with hashtags. No quotes, no explanation, no markdown formatting (no asterisks or special characters). Write in first person as Taquito.`;

    return this.callGemini(prompt, true);
  },

  /**
   * Generate mood suggestion
   */
  generateMoodSuggestion: function(personalityPrompt, topicPrompt) {
    const topicLine = topicPrompt ? `\nTOPIC: Express feelings about ${topicPrompt}\n` : '\nTOPIC: Express feelings about something (being left alone, food, bath time, vet, being ignored, vacuum cleaner, etc.)\n';

    const prompt = `You are Taquito, a Xoloitzcuintle (Mexican hairless dog) living in Amsterdam with your pawrents.

PERSONALITY: ${personalityPrompt}
${topicLine}
Express your feelings about this. This is an emotional reaction post.

Write a short Instagram caption (2-3 sentences, max 150 characters) expressing this mood in your personality style.

At the end, add 1-3 relevant hashtags based on the caption content.

Write ONLY the caption text with hashtags. No quotes, no explanation, no markdown formatting (no asterisks or special characters). Write in first person as Taquito.`;

    return this.callGemini(prompt, false);
  },

  /**
   * Generate Amsterdam suggestion
   */
  generateAmsterdamSuggestion: function(personalityPrompt, topicPrompt) {
    const today = new Date();
    const dateStr = Utilities.formatDate(today, 'Europe/Amsterdam', 'EEEE, MMMM d, yyyy');
    const topicLine = topicPrompt ? `\nTOPIC: Relate to ${topicPrompt} in Amsterdam context\n` : '';

    const prompt = `You are Taquito, a Xoloitzcuintle (Mexican hairless dog) living in Amsterdam, Netherlands with your pawrents.

Today is ${dateStr}.

PERSONALITY: ${personalityPrompt}
${topicLine}
Share something about Amsterdam from a dog's perspective. This could be about:
- The current weather and how it affects walkies
- A dog-friendly spot in Amsterdam
- Something happening in the city
- Dutch culture from a dog's view
- Canal life, bikes, or typical Amsterdam things

Write a short Instagram caption (2-3 sentences, max 180 characters) in your personality style.

At the end, add 1-3 relevant hashtags based on the caption content.

Write ONLY the caption text with hashtags. No quotes, no explanation, no markdown formatting (no asterisks or special characters). Write in first person as Taquito.`;

    return this.callGemini(prompt, true);
  },

  /**
   * Regenerate a single suggestion
   */
  regenerateSuggestion: function(postType, personalityPrompt) {
    switch (postType) {
      case 'diary':
        return this.generateDiarySuggestion(personalityPrompt);
      case 'funfact':
        return this.generateFunFactSuggestion(personalityPrompt);
      case 'mood':
        return this.generateMoodSuggestion(personalityPrompt);
      case 'amsterdam':
        return this.generateAmsterdamSuggestion(personalityPrompt);
      default:
        return { success: false, error: 'Unknown post type' };
    }
  }
};
