import React from 'react';
import { Mic, Square, ArrowRight, Trash2 } from "lucide-react";

interface ControlsProps {
  isRecording: boolean;
  hasText: boolean;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  onInsert: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  isRecording, hasText, onStart, onStop, onClear, onInsert 
}) => {
  return (
    <div className="controls-container">
      <button  type='button'
        className={`mic-button ${isRecording ? 'recording' : ''}`}
        onMouseDown={onStart}
        onMouseUp={onStop}
      >
        {isRecording ? <Square fill="currentColor" /> : <Mic size={32} />}
      </button>

      <div className="action-bar">
        <button type='button' onClick={onClear} disabled={!hasText} className="icon-btn secondary" title="Clear">
          <Trash2 size={20} />
        </button>
        
        <button type='button' onClick={onInsert} disabled={!hasText} className="action-btn primary" title="Insert Text">
          <span>Insert Text</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};