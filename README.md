# Taquito Instagram Post Generator

A mobile-first PWA for generating Instagram infographic posts for Taquito, a Xoloitzcuintli (Mexican hairless dog) living in Amsterdam.

Built with Google Apps Script + Gemini AI + Google Sheets/Drive.

## Features

- 7 personality modes for Taquito
- 4 post types: Diary, Fun Facts, Mood, Amsterdam
- AI-generated suggestions using Gemini 2.5 Flash
- AI-generated infographics using Nano Banana
- History tracking with Google Sheets
- Image storage with Google Drive
- Mobile-optimized PWA (Add to Home Screen on iPhone)

## Project Structure

```
/taquito
├── /app                 # Copy these to Apps Script
│   ├── Code.gs          # Main entry point, routing
│   ├── Config.gs        # API keys, constants, colors
│   ├── SuggestionEngine.gs  # Gemini 2.5 Flash integration
│   ├── ImageGenerator.gs    # Nano Banana integration
│   ├── SheetsDB.gs      # Google Sheets operations
│   ├── DriveStorage.gs  # Google Drive operations
│   ├── UI.gs            # HTML template handlers
│   ├── index.html       # Main app shell
│   ├── styles.html      # CSS (inline)
│   └── scripts.html     # JavaScript
├── /preview             # Local preview (design only)
│   └── preview.html
├── /docs
│   └── TAQUITO_PROJECT_SPEC.md
├── /assets
│   └── taquito_reference.png
└── README.md
```

> **Note:** Google Apps Script doesn't support folders. When deploying, copy all files from `/app` to the root of your Apps Script project.

## Setup Instructions

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project "Taquito App"
3. Enable APIs:
   - Google Sheets API
   - Google Drive API
   - Generative Language API (Gemini)

### 2. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API Key
3. Copy the key for later

### 3. Create Google Sheet

1. Create a new Google Sheet named "Taquito DB"
2. Note the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### 4. Create Google Drive Folder

1. Create a folder in Google Drive named "Taquito Images"
2. Right-click → Share → Change to "Anyone with the link can view"
3. Note the Folder ID from the URL:
   `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

### 5. Upload Taquito Reference Image

1. Upload `taquito_reference.png` to Google Drive
2. Note the File ID from the shareable link:
   `https://drive.google.com/file/d/FILE_ID_HERE/view`

### 6. Create Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project "Taquito Post Generator"
3. Delete the default `Code.gs` content
4. Create files and copy content:
   - `Code.gs`
   - `Config.gs`
   - `SuggestionEngine.gs`
   - `ImageGenerator.gs`
   - `SheetsDB.gs`
   - `DriveStorage.gs`
   - `UI.gs`
   - `index.html`
   - `styles.html`
   - `scripts.html`

### 7. Set Script Properties

1. In Apps Script, go to Project Settings (gear icon)
2. Scroll down to "Script Properties"
3. Add these properties:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `SHEET_ID`: Your Google Sheet ID
   - `DRIVE_FOLDER_ID`: Your Drive folder ID
   - `TAQUITO_IMAGE_ID`: Reference image file ID

### 8. Initialize Database

1. In Apps Script, run the `initializeDatabase()` function
2. Authorize the script when prompted
3. Check your Google Sheet - it should have 3 sheets: `posts`, `personalities`, `settings`

### 9. Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Select type: "Web app"
3. Configure:
   - Description: "Taquito v1"
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the Web App URL

### 10. Add to iPhone Home Screen

1. Open the Web App URL in Safari on iPhone
2. Tap the Share button
3. Select "Add to Home Screen"
4. Name it "Taquito"

## Usage

1. Open the app
2. Select a personality for Taquito
3. View 4 generated suggestions
4. Tap one to edit
5. Generate the infographic
6. Download image and copy caption
7. Post to Instagram!

## API Costs

This project uses Google's free tier:
- Apps Script: Free (with quotas)
- Google Sheets: Free
- Google Drive: 15GB free
- Gemini API: Free tier available

## Troubleshooting

### "Exceeded maximum execution time"
Image generation can take 30+ seconds. The script has retry logic built in.

### "Cannot read property of undefined"
Make sure all Script Properties are set correctly.

### Image not loading
Check that the Drive folder sharing is set to "Anyone with the link".

## Credits

- Character: Taquito, the Xoloitzcuintli
- Location: Amsterdam, Netherlands
- AI: Google Gemini 2.5 Flash + Nano Banana
- Infrastructure: Google Apps Script, Sheets, Drive
