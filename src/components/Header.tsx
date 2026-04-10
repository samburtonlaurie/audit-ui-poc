import '../styles/Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>🔍 Event Audit Dashboard</h1>
        <p>View and analyze game state changes in real-time</p>
      </div>
    </header>
  );
};

