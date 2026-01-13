/**
 * Taquito Instagram Post Generator
 * Configuration and Constants
 */

// API Endpoints
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const NANO_BANANA_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent';

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

// Default Topics
const DEFAULT_TOPICS = [
  { id: 'random', name: 'Surprise Me!', emoji: '🎲', prompt: '' },
  { id: 'walks', name: 'Walkies', emoji: '🦮', prompt: 'going for walks, the park, sniffing things, other dogs on the street' },
  { id: 'naps', name: 'Nap Time', emoji: '😴', prompt: 'sleeping, naps, the couch, blankets, being cozy' },
  { id: 'food', name: 'Food & Treats', emoji: '🦴', prompt: 'food, treats, snacks, begging, meal time, human food' },
  { id: 'weather', name: 'Weather', emoji: '🌦️', prompt: 'the weather in Amsterdam, rain, sun, cold, wind' },
  { id: 'pawrents', name: 'Pawrents', emoji: '👨‍👩‍👦', prompt: 'the humans, pawrents, what they do, working from home' },
  { id: 'alone', name: 'Home Alone', emoji: '🏠', prompt: 'being left alone, separation, waiting for pawrents to return' },
  { id: 'bathtime', name: 'Bath Time', emoji: '🛁', prompt: 'bath time, getting clean, water, being wet' },
  { id: 'vet', name: 'Vet Visit', emoji: '🏥', prompt: 'the vet, doctor visits, checkups, shots' },
  { id: 'couch', name: 'Couch Life', emoji: '🛋️', prompt: 'the couch, furniture, claiming spots, being comfy' },
  { id: 'custom', name: 'Custom Topic', emoji: '✏️', prompt: '', isCustom: true }
];

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
  breed: 'Xoloitzcuintle (Mexican hairless dog)',
  gender: 'Male',
  location: 'Amsterdam, Netherlands',
  heritage: 'Dutch + Mexican',
  description: `Taquito: Pixar-style 3D cartoon Xoloitzcuintle (Mexican hairless dog).
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

// Get visual style based on post type
function getPostTypeStyle(postType) {
  const styles = {
    'diary': `DIARY JOURNAL STYLE:
- Design it like a page from a personal diary or notebook
- Paper texture background with subtle lines or grid
- Handwritten-style font for the caption text
- Include a date stamp in the corner (today's date)
- Taquito peeking from the side or corner, like he's writing
- Warm, cozy, personal feeling
- Add a paw print signature at the bottom (like Taquito signed it)
- Maybe a coffee stain or ink splatter as decoration`,

    'funfact': `EDUCATIONAL FUN FACT STYLE:
- Bold "Did You Know?" or "Xolo Fact" banner at the top
- Clean, modern educational card design
- Large, readable typography for the fact
- Taquito as a teacher/professor (maybe with tiny glasses or pointing)
- Infographic elements like icons or small illustrations
- Professional but playful layout`,

    'mood': `MEME/REACTION STYLE:
- Bold, expressive, meme-inspired design
- Taquito's face/expression is the MAIN focus, large and centered
- Big, impactful text (top and/or bottom like classic memes)
- Dramatic lighting or background that matches the emotion
- High contrast, attention-grabbing
- The emotion should be instantly readable`,

    'amsterdam': `POSTCARD/TRAVEL STYLE:
- Vintage postcard or travel poster aesthetic
- Amsterdam elements in background (canals, bikes, tulips, windmills, Dutch houses)
- "Greetings from Amsterdam" or postcard-style framing
- Taquito as a tourist or local guide
- Stamp or postmark decorations
- Warm, nostalgic travel vibes`
  };
  return styles[postType] || styles['diary'];
}

// Image generation prompt template
function getImagePromptTemplate(postType, personality, caption) {
  const accentColor = getPostTypeColor(postType);
  const visualStyle = getPostTypeStyle(postType);

  return `Create an Instagram post featuring Taquito, matching the style and character design from the attached reference image.

CRITICAL - Taquito must have:
- HAIRLESS body and face - NO fur anywhere except the mohawk
- Dark spiky MOHAWK tuft of hair ONLY on top of head (his signature look - very important!)
- Charcoal gray smooth skin (completely hairless, no fur on face or body)
- Large expressive floppy ears
- Big round amber/golden eyes
- Long elegant snout
- Xoloitzcuintle (Mexican hairless dog) - he is HAIRLESS

CHARACTER MOOD: ${personality}
CAPTION TEXT TO INCLUDE: ${caption}

${visualStyle}

GENERAL GUIDELINES:
- Instagram square format (1080x1080)
- PRIMARY ACCENT COLOR: ${accentColor.name} (${accentColor.hex}) - use this prominently for backgrounds, borders, or highlights
- Secondary brand colors: Orange #FF5722, Pink #D81B60, Green #00C853, Blue #1E88E5
- Light background #FAFAFA
- Include the caption text in the design (readable, well-placed)
- Taquito's expression should match the ${personality} mood
- Modern, bold, eye-catching design
- IMPORTANT: Include "${INSTAGRAM_HANDLE}" subtly in a corner

REFERENCE IMAGE: Copy this character design exactly - especially the MOHAWK!`;
}
