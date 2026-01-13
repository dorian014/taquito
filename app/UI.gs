/**
 * Taquito Instagram Post Generator
 * UI Helper Functions
 */

const UI = {
  /**
   * Get post type display info
   */
  getPostTypeInfo: function(typeId) {
    for (const key in POST_TYPES) {
      if (POST_TYPES[key].id === typeId) {
        return POST_TYPES[key];
      }
    }
    return null;
  },

  /**
   * Format date for display
   */
  formatDate: function(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return Utilities.formatDate(date, 'Europe/Amsterdam', 'MMM d, yyyy HH:mm');
  },

  /**
   * Get all post types for UI
   */
  getPostTypes: function() {
    return Object.values(POST_TYPES);
  },

  /**
   * Get brand colors for UI
   */
  getColors: function() {
    return COLORS;
  },

  /**
   * Generate loading messages
   */
  getLoadingMessages: function() {
    return [
      "Taquito is thinking... 🐕",
      "Consulting the ancient Xolo wisdom... 👑",
      "Channeling dramatic energy... 😤",
      "Fetching inspiration from Amsterdam... 🌷",
      "Preparing the perfect pose... 📸",
      "Almost there, just one more treat... 🦴",
      "Creating art takes time... 🎨",
      "Taquito is working his magic... ✨"
    ];
  },

  /**
   * Get random loading message
   */
  getRandomLoadingMessage: function() {
    const messages = this.getLoadingMessages();
    return messages[Math.floor(Math.random() * messages.length)];
  },

  /**
   * Validate caption length
   */
  validateCaption: function(caption) {
    if (!caption || caption.trim().length === 0) {
      return { valid: false, error: 'Caption cannot be empty' };
    }
    if (caption.length > 2200) {
      return { valid: false, error: 'Caption too long (max 2200 characters)' };
    }
    return { valid: true };
  },

  /**
   * Generate hashtags based on post type
   */
  generateHashtags: function(postType) {
    const baseHashtags = ['#Taquito', '#Xoloitzcuintli', '#Xolo', '#MexicanHairlessDog', '#DogsOfInstagram'];

    const typeHashtags = {
      diary: ['#DogLife', '#DogDiary', '#DailyDog', '#DogMom', '#DogDad'],
      funfact: ['#DogFacts', '#DidYouKnow', '#XoloFacts', '#DogEducation', '#LearnSomethingNew'],
      mood: ['#DogMood', '#DogFeelings', '#DramaticDog', '#DogReactions', '#PetLife'],
      amsterdam: ['#Amsterdam', '#AmsterdamDogs', '#DogsOfAmsterdam', '#Netherlands', '#DutchDog']
    };

    const allHashtags = [...baseHashtags, ...(typeHashtags[postType] || [])];
    return allHashtags.join(' ');
  }
};

/**
 * Client-callable functions for the frontend
 */

function getUIPostTypes() {
  return UI.getPostTypes();
}

function getUIColors() {
  return UI.getColors();
}

function getUILoadingMessage() {
  return UI.getRandomLoadingMessage();
}

function validateUICaption(caption) {
  return UI.validateCaption(caption);
}

function getUIHashtags(postType) {
  return UI.generateHashtags(postType);
}

/**
 * Get Taquito reference image URL for logo display
 */
function getTaquitoImageUrl() {
  try {
    const config = getConfig();
    if (config.TAQUITO_IMAGE_ID) {
      return 'https://drive.google.com/thumbnail?id=' + config.TAQUITO_IMAGE_ID + '&sz=w100';
    }
    return '';
  } catch (e) {
    return '';
  }
}
