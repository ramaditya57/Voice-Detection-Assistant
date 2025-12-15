import React from 'react';

interface TranscriptBoxProps {
  text: string;
}

export const TranscriptBox: React.FC<TranscriptBoxProps> = ({ text }) => {
  return (
    <div className="transcript-box">
      {text ? (
        <p className="transcript-text">{text}</p>
      ) : (
        <div className="placeholder">
          <p>Hold <strong>Space</strong> or Click the <strong>Mic</strong> to speak.</p>
        </div>
      )}
    </div>
  );
};