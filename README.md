# 🎙️ Voice Dictation Assistant (Tauri + React)

A cross-platform desktop application that provides **real-time speech-to-text transcription** using the **Deepgram API**.  
Users can dictate text and seamlessly insert it into **any active application** (IDE, browser, Slack, etc.) via simulated native keystrokes.

Built with **Tauri v2**, **React**, **TypeScript**, and **Rust** for performance, security, and low resource usage.

---

## ✨ Features

- **Real-time Transcription**  
  High-accuracy speech-to-text powered by Deepgram’s **Nova-2** model.

- **Text Insertion Anywhere**  
  Automatically types transcribed text into the currently active window using native keyboard simulation.

- **Global Hotkeys**  
  Control recording without focusing the app (configurable).

- **Minimalist UI**  
  Clean, distraction-free interface with clear visual recording states.

- **Lightweight & Fast**  
  Uses Tauri to produce a small native binary with minimal memory usage.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Lucide React (icons)
- **Backend:** Rust (Tauri Framework)
- **AI Service:** Deepgram (Speech-to-Text API)
- **State Management:** React Hooks (`useTranscriber`, `useKeyboard`)

---

## 🚀 Prerequisites

1. **Node.js** v18 or later  
2. **Rust & Cargo** – required for Tauri  
3. **Tauri CLI**
   ```bash
   npm install -g @tauri-apps/cli
   ```
4. **Deepgram API Key** – https://console.deepgram.com

---

## 📦 Installation

### Clone the Repository
```bash
git clone https://github.com/your-username/voice-dictation-app.git
cd voice-dictation-app
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file:
```env
VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

---

## 🏃‍♂️ Running the App

```bash
npm run tauri dev
```

---

## 📂 Project Structure

```text
├── src-tauri/
├── src/
└── package.json
```

---

## 📄 License

MIT License
