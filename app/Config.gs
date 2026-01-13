/**
 * Taquito Instagram Post Generator
 * Configuration and Constants
 */

// API Endpoints
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const NANO_BANANA_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent';

// Get API keys and IDs from Script Properties
function getConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    GEMINI_API_KEY: props.getProperty('GEMINI_API_KEY'),
    SHEET_ID: props.getProperty('SHEET_ID'),
    DRIVE_FOLDER_ID: props.getProperty('DRIVE_FOLDER_ID'),
    TAQUITO_IMAGE_ID: props.getProperty('TAQUITO_IMAGE_ID')
  };
}

// Brand Colors (Option C - High Contrast)
const COLORS = {
  PRIMARY: '#FF5722',      // Deep Orange
  ACCENT: '#D81B60',       // Magenta Pink
  SUCCESS: '#00C853',      // Vivid Green
  SECONDARY: '#1E88E5',    // Royal Blue
  BACKGROUND: '#FAFAFA',   // Pure Light
  TEXT_DARK: '#212121',    // Dark Gray
  TEXT_LIGHT: '#757575'    // Medium Gray
};

// Post Types
const POST_TYPES = {
  DIARY: { id: 'diary', name: 'Diary', emoji: '🗓️', color: COLORS.PRIMARY },
  FUNFACT: { id: 'funfact', name: 'Fun Fact', emoji: '🧠', color: COLORS.SECONDARY },
  MOOD: { id: 'mood', name: 'Mood', emoji: '😤', color: COLORS.ACCENT },
  AMSTERDAM: { id: 'amsterdam', name: 'Amsterdam', emoji: '🌷', color: COLORS.SUCCESS }
};

// Default Personalities
const DEFAULT_PERSONALITIES = [
  {
    id: 'dramatic',
    name: 'Dramatic Diva',
    emoji: '😤',
    prompt: 'Everything is a catastrophe. Gasps, sighs, existential crisis over small things. Overly dramatic reactions to minor inconveniences.',
    isCustom: false
  },
  {
    id: 'sweet',
    name: 'Sweet & Wholesome',
    emoji: '🥰',
    prompt: 'Grateful, loving, sees the best in pawrents. Soft and warm tone. Appreciates the little things.',
    isCustom: false
  },
  {
    id: 'sassy',
    name: 'Sassy & Judgy',
    emoji: '😏',
    prompt: 'Side-eye energy. Judges humans, other dogs, pigeons. Unbothered king. Confident and slightly condescending.',
    isCustom: false
  },
  {
    id: 'wise',
    name: 'Wise & Philosophical',
    emoji: '🤓',
    prompt: 'Deep thoughts about life, naps, the meaning of treats. Contemplative and introspective. Shares wisdom.',
    isCustom: false
  },
  {
    id: 'chaotic',
    name: 'Chaotic Gremlin',
    emoji: '🤪',
    prompt: 'Unhinged energy. Zoomies. Chaos. No thoughts just vibes. Random and unpredictable.',
    isCustom: false
  },
  {
    id: 'royal',
    name: 'Royal Aztec Prince',
    emoji: '👑',
    prompt: 'Regal, dignified. References ancient Xolo heritage. Expects to be served. Speaks formally.',
    isCustom: false
  },
  {
    id: 'custom',
    name: 'Custom Vibe',
    emoji: '✏️',
    prompt: '',
    isCustom: true
  }
];

// Taquito Character Profile
const TAQUITO_PROFILE = {
  name: 'Taquito',
  breed: 'Xoloitzcuintli (Mexican hairless dog)',
  gender: 'Male',
  location: 'Amsterdam, Netherlands',
  heritage: 'Dutch + Mexican',
  description: `Taquito: Pixar-style 3D cartoon Xoloitzcuintli (Mexican hairless dog).
- Charcoal gray smooth skin
- Dark spiky mohawk tuft on head
- Large expressive floppy ears
- Big round amber/golden eyes with highlights
- Long elegant snout
- Sleek elegant build
- Expressive, emotive, personality-driven`
};

// Instagram handle
const INSTAGRAM_HANDLE = '@xolo_amsterdam';

// Get the primary accent color based on post type
function getPostTypeColor(postType) {
  const colorMap = {
    'diary': { hex: '#FF5722', name: 'Deep Orange' },
    'funfact': { hex: '#1E88E5', name: 'Royal Blue' },
    'mood': { hex: '#D81B60', name: 'Magenta Pink' },
    'amsterdam': { hex: '#00C853', name: 'Vivid Green' }
  };
  return colorMap[postType] || colorMap['diary'];
}

// Image generation prompt template
function getImagePromptTemplate(postType, personality, caption) {
  const accentColor = getPostTypeColor(postType);

  return `Create an Instagram infographic post featuring Taquito, a Pixar-style 3D cartoon Xoloitzcuintli (Mexican hairless dog) with charcoal gray smooth skin, dark spiky mohawk tuft on head, large expressive floppy ears, big round amber/golden eyes, and long elegant snout.

Post Type: ${postType}
Personality: ${personality}
Content: ${caption}

Style Guidelines:
- Instagram square format (1080x1080)
- PRIMARY ACCENT COLOR: ${accentColor.name} (${accentColor.hex}) - use this prominently for backgrounds, borders, or highlights
- Secondary brand colors: Orange #FF5722, Pink #D81B60, Green #00C853, Blue #1E88E5
- Light background #FAFAFA
- Include readable text overlay with the caption
- Modern, bold, eye-catching design with the accent color as the dominant visual element
- Taquito should be the main focus
- Match the personality mood in Taquito's expression
- IMPORTANT: Include the Instagram handle "${INSTAGRAM_HANDLE}" in a visible but subtle location (bottom corner or near the caption)

Reference image attached shows exactly how Taquito should look.`;
}
