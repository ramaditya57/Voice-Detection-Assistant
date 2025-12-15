import { invoke } from "@tauri-apps/api/core";
import { useTranscriber } from "./hooks/useTranscriber";
import { useKeyboard } from "./hooks/useKeyboard";
import { Header } from "./components/Header";
import { TranscriptBox } from "./components/TranscriptBox";
import { Controls } from "./components/Controls";
import "./App.css";

function App() {
  const { transcript, isRecording, connectionState, startRecording, stopRecording, clearTranscript } = useTranscriber();

  useKeyboard(isRecording, connectionState, startRecording, stopRecording);

  const handleInsert = async () => {
    console.log("Insert button clicked. Text:", transcript);
    if (!transcript) return;
    
    try {
      await invoke("type_text", { text: transcript });
      console.log("Text sent to Rust backend");
    } catch (error) {
      console.error("Failed to send text:", error);
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
        />
      </footer>
    </div>
  );
}

export default App;