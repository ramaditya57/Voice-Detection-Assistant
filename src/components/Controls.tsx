import React from 'react';
import { Mic, Square, ArrowRight, Trash2, Loader2 } from "lucide-react";

interface ControlsProps {
  isRecording: boolean;
  hasText: boolean;
  isInserting: boolean;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  onInsert: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  isRecording, hasText, isInserting, onStart, onStop, onClear, onInsert 
}) => {
  return (
    <div className="controls-container">
      <button  
        type='button'
        className={`mic-button ${isRecording ? 'recording' : ''}`}
        onMouseDown={onStart}
        onMouseUp={onStop}
        disabled={isInserting}
      >
        {isRecording ? <Square fill="currentColor" /> : <Mic size={32} />}
      </button>

      <div className="action-bar">
        <button 
          type='button' 
          onClick={onClear} 
          disabled={!hasText || isInserting} 
          className="icon-btn secondary" 
          title="Clear"
        >
          <Trash2 size={20} />
        </button>
        
        <button 
          type='button' 
          onClick={onInsert} 
          disabled={!hasText || isInserting}
          className="action-btn primary" 
          title="Insert Text"
        >
          {isInserting ? (
            <>
              <span>Inserting...</span>
              <Loader2 size={18} className="spin-animation" /> 
            </>
          ) : (
            <>
              <span>Insert Text</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
      
      <style>{`
        .spin-animation { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};