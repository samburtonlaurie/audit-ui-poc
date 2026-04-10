import { ChangeRecord, ChangeOperation } from '../types';
import '../styles/ChangeItem.css';

interface ChangeItemProps {
  change: ChangeRecord;
}

export const ChangeItem: React.FC<ChangeItemProps> = ({ change }) => {
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  // Determine what to display based on operation type
  const isReplace = change.operation === ChangeOperation.REPLACE;
  const isAdd = change.operation === ChangeOperation.ADD;
  const isRemove = change.operation === ChangeOperation.REMOVE;

  return (
    <div className={`change-item change-item--${change.operation.toLowerCase()}`}>
      <div className="change-header">
        <span className={`operation-badge operation-badge--${change.operation.toLowerCase()}`}>
          {change.operation}
        </span>
        <span className="category-badge">{change.category}</span>
        <span className="change-path">{change.path}</span>
      </div>

      <div className={`change-values ${isReplace ? 'change-values--compare' : ''}`}>
        {isReplace && change.previous_value !== null && change.previous_value !== undefined && (
          <div className="value-block previous-value">
            <strong>Old Value:</strong>
            <pre>{formatValue(change.previous_value)}</pre>
          </div>
        )}

        {isAdd && change.new_value !== null && change.new_value !== undefined && (
          <div className="value-block new-value new-value--full">
            <strong>New Value:</strong>
            <pre>{formatValue(change.new_value)}</pre>
          </div>
        )}

        {isRemove && change.previous_value !== null && change.previous_value !== undefined && (
          <div className="value-block previous-value">
            <strong>Removed Value:</strong>
            <pre>{formatValue(change.previous_value)}</pre>
          </div>
        )}

        {isReplace && change.new_value !== null && change.new_value !== undefined && (
          <div className="value-block new-value">
            <strong>New Value:</strong>
            <pre>{formatValue(change.new_value)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

