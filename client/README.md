# 🎬 V Studio – Browser-Based Video Editor

## Objective
V Studio is a browser-based video editing application that allows users to upload, edit, and export videos through a clean and intuitive interface.

---

## Core Features
- Video upload & preview
- Timeline trimming
- Text overlays with timing
- Aspect ratio presets (16:9, 9:16, 1:1)
- FFmpeg-based rendering
- Asynchronous export
- Downloadable final video

---

## Architecture
Frontend: Next.js (React)  
Backend: Node.js + Express  
Rendering: FFmpeg  
State: Structured JSON edit instructions

---

## Workflow
Upload → Edit → Preview → Export → Download

---

## Running Locally

### Backend
```bash
cd server
npm install
npm start

---

# 📁 `loom-script.md`

```md
# 🎥 V Studio – Loom Walkthrough Script

1. Open V Studio (logo & background visible)
2. Upload a video
3. Preview playback
4. Trim start and end using timeline
5. Add text overlay and adjust timing
6. Change aspect ratio
7. Export video
8. Show progress bar
9. Download final video

End with a quick summary of tech stack and architecture.
