/**
 * Taquito Instagram Post Generator
 * Google Sheets Database Operations
 */

const SheetsDB = {
  /**
   * Get spreadsheet instance
   */
  getSpreadsheet: function() {
    return SpreadsheetApp.openById(getConfig().SHEET_ID);
  },

  /**
   * Get all personalities
   */
  getPersonalities: function() {
    const ss = this.getSpreadsheet();
    const sheet = ss.getSheetByName('personalities');

    if (!sheet) {
      return DEFAULT_PERSONALITIES;
    }

    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return DEFAULT_PERSONALITIES;
    }

    const headers = data[0];
    const personalities = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      personalities.push({
        id: row[headers.indexOf('id')],
        name: row[headers.indexOf('name')],
        emoji: row[headers.indexOf('emoji')],
        prompt: row[headers.indexOf('prompt')],
        isCustom: row[headers.indexOf('is_custom')] === true || row[headers.indexOf('is_custom')] === 'TRUE'
      });
    }

    return personalities;
  },

  /**
   * Get personality by ID
   */
  getPersonalityById: function(id) {
    const personalities = this.getPersonalities();
    return personalities.find(p => p.id === id);
  },

  /**
   * Save a new post
   */
  savePost: function(postData) {
    const ss = this.getSpreadsheet();
    const sheet = ss.getSheetByName('posts');

    const row = [
      postData.id,
      new Date(),
      postData.personality,
      postData.postType,
      postData.suggestion,
      postData.finalCaption,
      postData.imageUrl,
      postData.imageId,
      postData.status
    ];

    sheet.appendRow(row);
    return { success: true, id: postData.id };
  },

  /**
   * Get posts with optional limit
   */
  getPosts: function(limit) {
    const ss = this.getSpreadsheet();
    const sheet = ss.getSheetByName('posts');

    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return [];
    }

    const headers = data[0];
    const posts = [];

    // Start from the end (newest first)
    const startIndex = Math.max(1, data.length - limit);

    for (let i = data.length - 1; i >= startIndex; i--) {
      const row = data[i];
      // Convert Date to ISO string for proper serialization to frontend
      const createdAtRaw = row[headers.indexOf('created_at')];
      const createdAt = createdAtRaw instanceof Date
        ? createdAtRaw.toISOString()
        : String(createdAtRaw);

      posts.push({
        id: row[headers.indexOf('id')],
        createdAt: createdAt,
        personality: row[headers.indexOf('personality')],
        postType: row[headers.indexOf('post_type')],
        suggestion: row[headers.indexOf('suggestion')],
        finalCaption: row[headers.indexOf('final_caption')],
        imageUrl: row[headers.indexOf('image_url')],
        imageId: row[headers.indexOf('image_id')],
        status: row[headers.indexOf('status')]
      });
    }

    return posts;
  },

  /**
   * Update post status
   */
  updatePostStatus: function(postId, status) {
    const ss = this.getSpreadsheet();
    const sheet = ss.getSheetByName('posts');

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idIndex = headers.indexOf('id');
    const statusIndex = headers.indexOf('status');

    for (let i = 1; i < data.length; i++) {
      if (data[i][idIndex] === postId) {
        sheet.getRange(i + 1, statusIndex + 1).setValue(status);
        return { success: true };
      }
    }

    return { success: false, error: 'Post not found' };
  },

  /**
   * Get a setting value
   */
  getSetting: function(key) {
    const ss = this.getSpreadsheet();
    const sheet = ss.getSheetByName('settings');

    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        return data[i][1];
      }
    }

    return null;
  },

  /**
   * Set a setting value
   */
  setSetting: function(key, value) {
    const ss = this.getSpreadsheet();
    const sheet = ss.getSheetByName('settings');

    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        sheet.getRange(i + 1, 2).setValue(value);
        return { success: true };
      }
    }

    // Key doesn't exist, add new row
    sheet.appendRow([key, value]);
    return { success: true };
  },

  /**
   * Save custom personality
   */
  saveCustomPersonality: function(name, emoji, prompt) {
    const ss = this.getSpreadsheet();
    const sheet = ss.getSheetByName('personalities');

    const id = 'custom_' + Utilities.getUuid().substring(0, 8);

    sheet.appendRow([id, name, emoji, prompt, true]);

    return {
      success: true,
      personality: { id, name, emoji, prompt, isCustom: true }
    };
  }
};
