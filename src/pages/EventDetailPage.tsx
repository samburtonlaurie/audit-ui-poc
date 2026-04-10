import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DiffList } from '../components/DiffList';
import { diffsApi } from '../api';
import '../styles/EventDetailPage.css';

export const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [expandedTimestamps, setExpandedTimestamps] = useState<Set<string>>(new Set());

  const id = eventId ? parseInt(eventId, 10) : 0;

  // React Query handles all fetching, caching, and refetching
  const { data: diffs = [], isLoading, error } = useQuery({
    queryKey: ['diffs', id],
    queryFn: () => diffsApi.getDiffHistory(id, 200),
    enabled: id > 0,
    refetchInterval: autoRefresh ? 5000 : false,
  });

  const eventName = diffs.length > 0 ? diffs[0].event_name : '';

  return (
    <div className="event-detail-page">
      <div className="detail-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Search
        </button>
        <div className="event-info">
          <h1>{eventName}</h1>
          <p>Event ID: {eventId}</p>
        </div>
      </div>

      <div className="detail-controls">
        <label className="auto-refresh">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
          Auto-refresh every 5s
        </label>
      </div>

      <DiffList
        diffs={diffs}
        loading={isLoading}
        error={error?.message}
        expandedDiffIds={expandedTimestamps}
        onToggleDiff={(timestamp) => {
          setExpandedTimestamps(prev => {
            const next = new Set(prev);
            next.has(timestamp) ? next.delete(timestamp) : next.add(timestamp);
            return next;
          });
        }}
      />
    </div>
  );
};

