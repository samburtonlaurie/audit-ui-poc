import { useState } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearchById: (eventId: number) => void;
  onSearchByName: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchById, onSearchByName }) => {
  const [searchType, setSearchType] = useState<'id' | 'name'>('id');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    if (searchType === 'id') {
      const eventId = parseInt(searchValue, 10);
      if (!isNaN(eventId)) {
        onSearchById(eventId);
      }
    } else {
      onSearchByName(searchValue);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-type-selector">
        <label>
          <input
            type="radio"
            value="id"
            checked={searchType === 'id'}
            onChange={(e) => setSearchType(e.target.value as 'id' | 'name')}
          />
          Search by Event ID
        </label>
        <label>
          <input
            type="radio"
            value="name"
            checked={searchType === 'name'}
            onChange={(e) => setSearchType(e.target.value as 'id' | 'name')}
          />
          Search by Event Name
        </label>
      </div>

      <div className="search-input-group">
        <input
          type="text"
          placeholder={searchType === 'id' ? 'Enter Event ID...' : 'Enter Event Name...'}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

