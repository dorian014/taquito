# Taquito Instagram Post Generator

A mobile-first PWA for generating Instagram infographic posts for Taquito, a Xoloitzcuintle (Mexican hairless dog) living in Amsterdam.

[![Launch App](https://img.shields.io/badge/Launch%20App-Taquito-FF5722?style=for-the-badge&logo=pwa&logoColor=white)](https://dorian014.github.io/taquito/)

## Features

- 7 personality modes for Taquito
- 11 topic options to vary content
- 4 post types: Diary, Fun Facts, Mood, Amsterdam
- AI-generated captions using Gemini 2.5 Flash
- AI-generated infographics using Gemini 3 Pro Image
- History tracking with Google Sheets
- Image storage with Google Drive
- Mobile-optimized PWA (Add to Home Screen)

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  GitHub Pages   │────▶│  Apps Script    │────▶│  Google APIs    │
│  (Frontend)     │     │  (API Backend)  │     │  Gemini/Sheets  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **Frontend**: Static HTML/CSS/JS hosted on GitHub Pages
- **Backend**: Google Apps Script serving as API
- **Database**: Google Sheets
- **Storage**: Google Drive
- **AI**: Gemini 2.5 Flash (text) + Gemini 3 Pro Image (images)

## Project Structure

```
/taquito
├── index.html           # Frontend (GitHub Pages)
├── /app                 # Backend (copy to Apps Script)
│   ├── Code.gs          # API routing
│   ├── Config.gs        # Constants, prompts, topics
│   ├── SuggestionEngine.gs  # Gemini text generation
│   ├── ImageGenerator.gs    # Gemini image generation
│   ├── SheetsDB.gs      # Google Sheets operations
│   └── DriveStorage.gs  # Google Drive operations
├── /assets
│   └── taquito_reference.png
└── README.md
```

## Setup Instructions

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API Key
3. Save for later

### 2. Create Google Sheet

1. Create a new Google Sheet named "Taquito DB"
2. Note the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### 3. Create Google Drive Folder

1. Create a folder named "Taquito Images"
2. Share it: "Anyone with the link can view"
3. Note the Folder ID from URL

### 4. Upload Reference Image

1. Upload `assets/taquito_reference.png` to Google Drive
2. Note the File ID from the shareable link

### 5. Create Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Create new project "Taquito API"
3. Create these files and copy content from `/app`:
   - `Code.gs`
   - `Config.gs`
   - `SuggestionEngine.gs`
   - `ImageGenerator.gs`
   - `SheetsDB.gs`
   - `DriveStorage.gs`

### 6. Set Script Properties

In Apps Script → Project Settings → Script Properties, add:
- `GEMINI_API_KEY`: Your Gemini API key
- `SHEET_ID`: Your Google Sheet ID
- `DRIVE_FOLDER_ID`: Your Drive folder ID
- `TAQUITO_IMAGE_ID`: Reference image file ID

### 7. Initialize Database

1. Run `initializeDatabase()` in Apps Script
2. Authorize when prompted
3. Check Sheet has: `posts`, `personalities`, `settings`

### 8. Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Copy the deployment URL

### 9. Update Frontend

Update `API_URL` in `index.html` with your deployment URL.

### 10. Enable GitHub Pages

1. Go to repo Settings → Pages
2. Source: Deploy from branch
3. Branch: `main`, Folder: `/ (root)`
4. Save

Your app will be live at: `https://YOUR_USERNAME.github.io/taquito/`

## Usage

1. Open the app on your phone
2. Select a personality (mood) for Taquito
3. Select a topic
4. Tap "Generate Ideas"
5. Pick a suggestion and edit if needed
6. Generate the infographic
7. Download image and copy caption
8. Post to Instagram!

## Add to Home Screen

**iPhone (Safari):**
1. Open the app URL
2. Tap Share → "Add to Home Screen"

**Android (Chrome):**
1. Open the app URL
2. Tap menu → "Add to Home Screen"

## API Endpoints

The Apps Script backend exposes these endpoints via GET:

| Action | Parameters |
|--------|------------|
| `getPersonalities` | - |
| `getTopics` | - |
| `generateSuggestions` | personalityId, customPrompt, topicId, customTopic |
| `generateImage` | postType, personalityId, caption |
| `getPostHistory` | limit |
| `updatePostStatus` | postId, status |
| `getImageDownloadUrl` | imageId |

Example: `API_URL?action=getTopics`

## Costs

All free tier:
- GitHub Pages: Free
- Apps Script: Free (with quotas)
- Google Sheets: Free
- Google Drive: 15GB free
- Gemini API: Free tier available

## Credits

- Character: Taquito, the Xoloitzcuintle
- Location: Amsterdam, Netherlands
- AI: Google Gemini 2.5 Flash + Gemini 3 Pro Image
- Instagram: [@xolo_amsterdam](https://instagram.com/xolo_amsterdam)
