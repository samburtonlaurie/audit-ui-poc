import { AuditDiff } from '../types';
import { ChangeItem } from './ChangeItem';
import '../styles/DiffItem.css';

interface DiffItemProps {
  diff: AuditDiff;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const DiffItem: React.FC<DiffItemProps> = ({ diff, isExpanded = false, onToggle = () => {} }) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleClick = () => {
    onToggle();
  };

  return (
    <div className={`diff-item diff-item--${diff.diff_type.toLowerCase()}`}>
      <div
        className="diff-header"
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <div className="diff-header-main">
          <span className={`diff-badge diff-badge--${diff.diff_type.toLowerCase()}`}>
            {diff.diff_type}
          </span>
          <span className="diff-event-name">{diff.event_name}</span>
          <span className="diff-time">{formatDate(diff.timestamp)}</span>
        </div>
        <div className="diff-summary">
          <span className="change-count">{diff.changes.length} changes</span>
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="diff-body">
          {diff.changes.length === 0 ? (
            <p className="no-changes">No changes</p>
          ) : (
            <div className="changes-list">
              {diff.changes.map((change, idx) => (
                <ChangeItem key={idx} change={change} />
              ))}
            </div>
          )}

          <div className="diff-footer">
            <small>Event ID: {diff.event_id}</small>
            <small>Current Hash: {diff.current_message_hash.substring(0, 8)}...</small>
            {diff.previous_message_hash && (
              <small>Previous Hash: {diff.previous_message_hash.substring(0, 8)}...</small>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

