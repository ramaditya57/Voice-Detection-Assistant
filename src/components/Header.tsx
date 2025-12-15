import React from 'react';

interface HeaderProps {
  connectionState: string;
}

export const Header: React.FC<HeaderProps> = ({ connectionState }) => {
  return (
    <header className="app-header">
      <h1>Wispr Clone</h1>
      <div className={`status-badge ${connectionState}`}>
        <div className={`status-dot ${connectionState}`}></div>
        {connectionState}
      </div>
    </header>
  );
};