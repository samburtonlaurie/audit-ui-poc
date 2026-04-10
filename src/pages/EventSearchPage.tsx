import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventSummary } from '../types';
import { diffsApi } from '../api';
import '../styles/EventSearchPage.css';

export const EventSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [searched, setSearched] = useState(false);

  // Load all events on mount
  useEffect(() => {
    const loadAllEvents = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const results = await diffsApi.getAllEvents(100);
        setEvents(results);
        setSearched(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllEvents();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(undefined);
      const results = searchValue.trim()
        ? await diffsApi.searchEvents(searchValue, 100)
        : await diffsApi.getAllEvents(100);
      setEvents(results);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="event-search-page">
      <div className="search-hero">
        <h1>🔍 Find an Event</h1>
        <p>Search by event name to explore game state changes</p>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="e.g., Iran vs Philippines, Manchester United..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loading">Loading events...</div>}

      {searched && events.length === 0 && !loading && (
        <div className="no-results">
          {searchValue ? `No events found for "${searchValue}"` : 'No events available'}
        </div>
      )}

      {events.length > 0 && (
        <div className="events-grid">
          <h2>
            {searchValue
              ? `Found ${events.length} event${events.length !== 1 ? 's' : ''} matching "${searchValue}"`
              : `All Events (${events.length})`
            }
          </h2>
          <div className="events-list">
            {events.map((event) => (
              <div
                key={event.eventId}
                className="event-card"
                onClick={() => handleEventClick(event.eventId)}
                role="button"
                tabIndex={0}
              >
                <div className="event-card-header">
                  <h3>{event.eventName}</h3>
                  <span className="event-id">#{event.eventId}</span>
                </div>
                <div className="event-card-footer">
                  <span>Click to view diffs →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

