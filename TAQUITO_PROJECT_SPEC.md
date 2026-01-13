# Taquito Instagram Post Generator - Project Specification

## 🎯 Project Overview

Build a lightweight mobile web app (PWA) for generating Instagram infographic posts for "Taquito", a Xoloitzcuintli (Mexican hairless dog) living in Amsterdam. The app should run entirely on Google's free infrastructure (Apps Script + Sheets + Drive) and use Google's Gemini AI for content generation and Nano Banana for image generation.

**Target Platform:** iPhone (mobile-optimized PWA, "Add to Home Screen")

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────┐
│              📱 iPhone Safari/PWA                   │
│           (Mobile-optimized HTML UI)               │
└────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────┐
│              Google Apps Script                     │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│    │Suggestion│  │ Generate │  │  History │       │
│    │  Engine  │  │  Image   │  │   View   │       │
│    └──────────┘  └──────────┘  └──────────┘       │
└────────────────────────────────────────────────────┘
         │                │              │
         ▼                ▼              ▼
┌─────────────┐    ┌───────────┐  ┌───────────┐
│  Gemini 2.5 │    │   Nano    │  │  Google   │
│    Flash    │    │  Banana   │  │  Sheets   │
│  (+ Search) │    │  (Image)  │  │   (DB)    │
└─────────────┘    └───────────┘  └───────────┘
                         │
                         ▼
                  ┌───────────┐
                  │  Google   │
                  │   Drive   │
                  │ (Storage) │
                  └───────────┘
```

---

## 🐕 Taquito Character Profile

### Basic Info
- **Name:** Taquito
- **Breed:** Xoloitzcuintli (Xolo) - Mexican hairless dog
- **Gender:** Male
- **Location:** Amsterdam, Netherlands
- **Heritage:** Dutch 🇳🇱 + Mexican 🇲🇽

### Visual Style
- **Art Style:** Pixar/Disney 3D cartoon
- **Reference Image:** https://drive.google.com/file/d/1h0WfuZU890q9hNTXWzus4QNf6S4KSRxF/view?usp=sharing

### Character Description (for image prompts)
```
Taquito: Pixar-style 3D cartoon Xoloitzcuintli (Mexican hairless dog).
- Charcoal gray smooth skin
- Dark spiky mohawk tuft on head
- Large expressive floppy ears
- Big round amber/golden eyes with highlights
- Long elegant snout
- Sleek elegant build
- Expressive, emotive, personality-driven
```

---

## 🎨 Brand Colors (Option C - High Contrast)

| Role | Color | Hex Code |
|------|-------|----------|
| **Primary** | Deep Orange | `#FF5722` |
| **Accent** | Magenta Pink | `#D81B60` |
| **Success/Tags** | Vivid Green | `#00C853` |
| **Secondary** | Royal Blue | `#1E88E5` |
| **Background** | Pure Light | `#FAFAFA` |
| **Text Dark** | Dark Gray | `#212121` |
| **Text Light** | Medium Gray | `#757575` |

---

## 🎭 Personality System

Users select a personality before generating suggestions. All content should be written from Taquito's first-person perspective in the selected personality.

| # | Personality | Emoji | Prompt Modifier |
|---|-------------|-------|-----------------|
| 1 | Dramatic Diva | 😤 | "Everything is a catastrophe. Gasps, sighs, existential crisis over small things. Overly dramatic reactions to minor inconveniences." |
| 2 | Sweet & Wholesome | 🥰 | "Grateful, loving, sees the best in pawrents. Soft and warm tone. Appreciates the little things." |
| 3 | Sassy & Judgy | 😏 | "Side-eye energy. Judges humans, other dogs, pigeons. Unbothered king. Confident and slightly condescending." |
| 4 | Wise & Philosophical | 🤓 | "Deep thoughts about life, naps, the meaning of treats. Contemplative and introspective. Shares wisdom." |
| 5 | Chaotic Gremlin | 🤪 | "Unhinged energy. Zoomies. Chaos. No thoughts just vibes. Random and unpredictable." |
| 6 | Royal Aztec Prince | 👑 | "Regal, dignified. References ancient Xolo heritage. Expects to be served. Speaks formally." |
| 7 | Custom Vibe | ✏️ | User enters their own personality description |

---

## 📝 Post Types

### 1. 🗓️ Diary
- **Purpose:** Daily life updates, what Taquito did today
- **Data Source:** User input or AI generates based on common dog activities
- **Examples:** walks, naps, meals, encounters with other dogs, watching pawrents

### 2. 🧠 Fun Facts
- **Purpose:** Educational content about Xolos, dogs, or Amsterdam
- **Data Source:** Gemini 2.5 Flash with Search Grounding
- **Examples:** Xolo history, Aztec heritage, dog facts, Amsterdam dog-friendly places

### 3. 😤 Mood
- **Purpose:** Emotional reactions to pawrent behavior
- **Data Source:** AI generates based on common pet owner situations
- **Examples:** being left alone, not sharing food, bath time, vet visits

### 4. 🌷 Amsterdam
- **Purpose:** Local content about Amsterdam from a dog's perspective
- **Data Source:** Gemini 2.5 Flash with Search Grounding for real-time info
- **Examples:** weather updates, local events, dog parks, pet-friendly cafes, news

---

## 📱 User Flow

```
┌─────────────────────────────────────┐
│  STEP 1: Select Personality         │
│                                     │
│  🎭 How is Taquito feeling today?   │
│                                     │
│  [😤] [🥰] [😏] [🤓] [🤪] [👑] [✏️] │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│  STEP 2: View Suggestions           │
│                                     │
│  📋 Here's what Taquito could post: │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🗓️ Diary                    │   │
│  │ "Today I supervised my..."  │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🧠 Fun Fact                 │   │
│  │ "Did you know Xolos..."     │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 😤 Mood                     │   │
│  │ "The audacity of my..."     │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🌷 Amsterdam                │   │
│  │ "Perfect 15°C weather..."   │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
                 │
                 ▼ (user taps one)
┌─────────────────────────────────────┐
│  STEP 3: Edit & Generate            │
│                                     │
│  ✏️ Edit suggestion:                │
│  ┌─────────────────────────────┐   │
│  │ [editable text area]        │   │
│  └─────────────────────────────┘   │
│                                     │
│  [🎨 Generate Infographic]          │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│  STEP 4: Preview & Export           │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │     [Generated Image]       │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  Caption:                           │
│  "Did you know that Xolos were..."  │
│                                     │
│  [📥 Download] [📋 Copy Caption]    │
│  [🔄 Regenerate]                    │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│  📚 History (accessible anytime)    │
│                                     │
│  View all previously generated      │
│  posts with date, personality,      │
│  type, and download links           │
└─────────────────────────────────────┘
```

---

## 🗄️ Google Sheets Database Structure

### Sheet 1: `posts`
| Column | Type | Description |
|--------|------|-------------|
| id | STRING | Unique post ID (UUID) |
| created_at | DATETIME | When post was created |
| personality | STRING | Selected personality name |
| post_type | STRING | diary/funfact/mood/amsterdam |
| suggestion | TEXT | Original AI suggestion |
| final_caption | TEXT | Final caption (after edits) |
| image_url | STRING | Google Drive URL of generated image |
| image_id | STRING | Google Drive file ID |
| status | STRING | generated/downloaded/posted |

### Sheet 2: `personalities`
| Column | Type | Description |
|--------|------|-------------|
| id | STRING | Personality ID |
| name | STRING | Display name |
| emoji | STRING | Emoji icon |
| prompt | TEXT | Prompt modifier for AI |
| is_custom | BOOLEAN | Whether user-defined |

### Sheet 3: `settings`
| Column | Type | Description |
|--------|------|-------------|
| key | STRING | Setting name |
| value | TEXT | Setting value |

---

## 🔧 Technical Implementation

### Google Apps Script Structure

```
/TaquitoApp
├── Code.gs              # Main entry point, routing
├── Config.gs            # API keys, constants, colors
├── SuggestionEngine.gs  # Gemini 2.5 Flash integration
├── ImageGenerator.gs    # Nano Banana integration
├── SheetsDB.gs          # Google Sheets operations
├── DriveStorage.gs      # Google Drive operations
├── UI.gs                # HTML template handlers
└── /html
    ├── index.html       # Main app shell
    ├── styles.html      # CSS (inline for PWA)
    └── scripts.html     # JavaScript
```

### API Integration

#### Gemini 2.5 Flash (for suggestions)
```javascript
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Use with Search Grounding for Amsterdam/weather/news content
const payload = {
  contents: [{ parts: [{ text: prompt }] }],
  tools: [{ googleSearch: {} }]  // Enable search grounding
};
```

#### Nano Banana (for image generation)
```javascript
const NANO_BANANA_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-image-generation:generateContent';

// Include Taquito reference image for character consistency
const payload = {
  contents: [{
    parts: [
      { text: imagePrompt },
      { inlineData: { mimeType: 'image/png', data: taquitoBase64 } }
    ]
  }],
  generationConfig: {
    responseModalities: ['TEXT', 'IMAGE']
  }
};
```

### Image Prompt Template
```
Create an Instagram infographic post featuring Taquito, a Pixar-style 3D cartoon Xoloitzcuintli (Mexican hairless dog) with charcoal gray smooth skin, dark spiky mohawk tuft on head, large expressive floppy ears, big round amber/golden eyes, and long elegant snout.

Post Type: [POST_TYPE]
Personality: [PERSONALITY]
Content: [CAPTION_TEXT]

Style Guidelines:
- Instagram square format (1080x1080)
- Use brand colors: Orange #FF5722, Pink #D81B60, Green #00C853, Blue #1E88E5
- Light background #FAFAFA
- Include readable text overlay with the caption
- Modern, bold, eye-catching design
- Taquito should be the main focus
- Match the personality mood in Taquito's expression

Reference image attached shows exactly how Taquito should look.
```

---

## 📱 PWA Configuration

### manifest.json (embedded in HTML)
```json
{
  "name": "Taquito Post Generator",
  "short_name": "Taquito",
  "description": "Generate Instagram posts for Taquito the Xolo",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FAFAFA",
  "theme_color": "#FF5722",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Mobile Optimizations
- Touch-friendly buttons (min 44px tap targets)
- Swipe gestures for navigation
- Pull-to-refresh for suggestions
- Bottom navigation for thumb access
- Safe area insets for iPhone notch

---

## 🎨 UI Design Specifications

### Typography
- **Headings:** System font, bold, #212121
- **Body:** System font, regular, #212121
- **Secondary:** System font, regular, #757575
- **Sizes:** 24px (h1), 18px (h2), 16px (body), 14px (small)

### Components

#### Personality Selector
- Horizontal scrollable row of emoji buttons
- Selected state: colored background with brand color
- Size: 60x60px touch targets

#### Suggestion Cards
- White background with subtle shadow
- Left border accent color based on post type
- Tap to select, expandable

#### Action Buttons
- Primary (Download): `#FF5722` background, white text
- Secondary (Copy): `#1E88E5` background, white text  
- Tertiary (Regenerate): `#D81B60` background, white text
- Border radius: 12px
- Padding: 16px 24px

---

## 🔐 Setup Instructions

### 1. Create Google Cloud Project
1. Go to Google Cloud Console
2. Create new project "Taquito App"
3. Enable APIs:
   - Google Sheets API
   - Google Drive API
   - Generative Language API (Gemini)

### 2. Get API Key
1. Go to API Credentials
2. Create API Key
3. Restrict to Generative Language API

### 3. Create Google Sheet
1. Create new Google Sheet named "Taquito DB"
2. Create sheets: `posts`, `personalities`, `settings`
3. Note the Sheet ID from URL

### 4. Create Drive Folder
1. Create folder "Taquito Images"
2. Set sharing to "Anyone with link can view"
3. Note the Folder ID

### 5. Deploy Apps Script
1. Create new Apps Script project
2. Copy all code files
3. Add Script Properties:
   - `GEMINI_API_KEY`: Your API key
   - `SHEET_ID`: Your Google Sheet ID
   - `DRIVE_FOLDER_ID`: Your Drive folder ID
   - `TAQUITO_IMAGE_ID`: Reference image file ID
4. Deploy as Web App
   - Execute as: Me
   - Access: Anyone

---

## 📋 Features Checklist

### MVP (Phase 1)
- [ ] Personality selector (7 options)
- [ ] Generate 4 suggestions based on personality
- [ ] Edit suggestion before generating
- [ ] Generate infographic with Nano Banana
- [ ] Download image button
- [ ] Copy caption button
- [ ] Regenerate button
- [ ] Save to Google Sheets
- [ ] Save image to Google Drive

### Phase 2
- [ ] History view (past posts)
- [ ] PWA install prompt
- [ ] Offline indicator
- [ ] Loading animations
- [ ] Error handling & retry

### Phase 3 (Future)
- [ ] Multiple image styles
- [ ] Hashtag suggestions
- [ ] Best posting time recommendations
- [ ] Analytics dashboard

---

## 🚨 Important Notes

1. **API Limits:** Gemini API has rate limits. Implement caching and debouncing.

2. **Image Storage:** Save all generated images to Drive immediately. Don't rely on temporary URLs.

3. **Character Consistency:** ALWAYS include the Taquito reference image when generating with Nano Banana.

4. **Mobile First:** Test everything on iPhone Safari. Apps Script web apps can be tricky on mobile.

5. **Error Handling:** Wrap all API calls in try-catch. Show user-friendly error messages.

6. **Loading States:** Image generation takes 10-30 seconds. Show engaging loading states.

---

## 📚 Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Nano Banana Image Generation](https://ai.google.dev/gemini-api/docs/image-generation)
- [PWA on iOS](https://web.dev/learn/pwa/progressive-web-apps/)

---

## 🐕 That's it! Build something amazing for Taquito!
