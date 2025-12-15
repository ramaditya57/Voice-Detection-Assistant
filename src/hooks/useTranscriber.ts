import { useState, useRef } from "react";
import {
  createClient,
  LiveClient,
  LiveTranscriptionEvents,
} from "@deepgram/sdk";

const DEEPGRAM_API_KEY = "cec1b87f4106470cc7b420c6c9acfab02ceda8e9";

export function useTranscriber() {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [connectionState, setConnectionState] = useState<
    "closed" | "connecting" | "connected"
  >("closed");

  const deepgramRef = useRef<LiveClient | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      setConnectionState("connecting");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const deepgram = createClient(DEEPGRAM_API_KEY);
      const connection = deepgram.listen.live({
        model: "nova-2",
        language: "en-US",
        smart_format: true,
      });

      connection.on(LiveTranscriptionEvents.Open, () => {
        setConnectionState("connected");
        setIsRecording(true);

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0 && connection.getReadyState() === 1) {
            connection.send(event.data);
          }
        });
        mediaRecorderRef.current.start(100);
      });

      connection.on(LiveTranscriptionEvents.Transcript, (data) => {
        const isFinal = data.is_final;
        const newText = data.channel?.alternatives?.[0]?.transcript;

        if (newText && isFinal) {
          setTranscript((prev) => (prev ? prev + " " + newText : newText));
        }
      });

      deepgramRef.current = connection;
    } catch (error) {
      console.error("Error starting recording:", error);
      setConnectionState("closed");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop();
    }

    if (deepgramRef.current) {
      deepgramRef.current.finish();
      deepgramRef.current = null;
    }

    setIsRecording(false);
    setConnectionState("closed");
  };

  return {
    transcript,
    isRecording,
    connectionState,
    startRecording,
    stopRecording,
    clearTranscript: () => setTranscript(""),
  };
}
