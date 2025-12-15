import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useTranscriber } from "./hooks/useTranscriber";
import { useKeyboard } from "./hooks/useKeyboard";
import { Header } from "./components/Header";
import { TranscriptBox } from "./components/TranscriptBox";
import { Controls } from "./components/Controls";
import "./App.css";

function App() {
  const { transcript, isRecording, connectionState, startRecording, stopRecording, clearTranscript } = useTranscriber();

  // 1. New state to track if we are currently typing
  const [isInserting, setIsInserting] = useState(false);

  // 2. Disable keyboard shortcuts if we are currently inserting text
  // (Pass !isInserting as an 'isEnabled' flag if your hook supports it, otherwise leave as is)
  useKeyboard(isRecording, connectionState, startRecording, stopRecording);

  const handleInsert = async () => {
    console.log("Insert requested. Current text:", transcript);
    
    // 3. Guard Clause: Don't insert if empty or ALREADY inserting
    if (!transcript || isInserting) return;
    
    try {
      // 4. Lock the state
      setIsInserting(true);
      
      await invoke("type_text", { text: transcript });
      console.log("Text successfully sent to backend");
      
      // Optional: Uncomment the next line if you want to clear text automatically after inserting
      // clearTranscript(); 
      
    } catch (error) {
      console.error("Failed to send text:", error);
    } finally {
      // 5. Unlock the state (always runs, even if there is an error)
      setIsInserting(false);
    }
  };

  return (
    <div className="container">
      <Header connectionState={connectionState} />
      
      <main className="main-content">
        <TranscriptBox text={transcript} />
      </main>

      <footer className="footer-controls">
        <Controls 
          isRecording={isRecording}
          hasText={transcript.length > 0}
          onStart={startRecording}
          onStop={stopRecording}
          onClear={clearTranscript}
          onInsert={handleInsert}
          isInserting={isInserting} // 6. Pass the new state to controls
        />
      </footer>
    </div>
  );
}

export default App;