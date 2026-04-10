import { useState, useMemo } from 'react';
import { GameStateDiff, ChangeCategory } from '../types';
import { DiffItem } from './DiffItem';
import '../styles/DiffList.css';

interface DiffListProps {
  diffs: GameStateDiff[];
  loading: boolean;
  error?: string;
  expandedDiffIds?: Set<string>;
  onToggleDiff?: (diffKey: string) => void;
}

export const DiffList: React.FC<DiffListProps> = ({
  diffs,
  loading,
  error,
  expandedDiffIds = new Set(),
  onToggleDiff = () => {},
}) => {
  const [filterCategory, setFilterCategory] = useState<ChangeCategory | 'ALL'>('ALL');

  const categories = useMemo(() => {
    const cats = new Set<ChangeCategory>();
    diffs.forEach(diff => {
      diff.changes.forEach(change => {
        cats.add(change.category);
      });
    });
    return Array.from(cats).sort();
  }, [diffs]);

  const filteredDiffs = useMemo(() => {
    if (filterCategory === 'ALL') {
      return diffs;
    }
    return diffs.map(diff => ({
      ...diff,
      changes: diff.changes.filter(c => c.category === filterCategory)
    })).filter(diff => diff.changes.length > 0);
  }, [diffs, filterCategory]);

  if (loading) {
    return <div className="loading">Loading diffs...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (diffs.length === 0) {
    return <div className="no-data">No diffs found</div>;
  }

  return (
    <div className="diff-list">
      <div className="filter-section">
        <label>Filter by Category:</label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value as any)}>
          <option value="ALL">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

        <div className="diffs-container">
          {filteredDiffs.length === 0 ? (
            <div className="no-data">No changes in selected category</div>
          ) : (
            filteredDiffs.map((diff) => {
              const timestamp = diff.timestamp;
              const isExpanded = expandedDiffIds.has(timestamp);
              return (
                <DiffItem
                  key={timestamp}
                  diff={diff}
                  isExpanded={isExpanded}
                  onToggle={() => onToggleDiff(timestamp)}
                />
              );
            })
          )}
        </div>
    </div>
  );
};

