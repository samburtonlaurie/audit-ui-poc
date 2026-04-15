# Audit UI

A modern React + Vite + TypeScript web interface for browsing and auditing game state diffs.

## Features

- 🔍 **Search Events**: Find events by name with fuzzy matching
- 📊 **Event List**: Browse matching events and select one to explore
- 🎯 **Diff History**: View all diffs for a specific event with auto-refresh every 5 seconds
- 🏷️ **Category Filtering**: Filter changes by category (GOALS, CARDS, PENALTIES, etc.)
- 📝 **Detailed Changes**: View before/after values for each change
- 🎨 **Dark Theme**: Professional dark UI with color-coded operations
- 🔄 **Auto-Refresh**: Toggle automatic polling for live updates

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd audit-ui
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000` with API calls proxied to `http://localhost:8081`.

### Build

```bash
npm run build
```

## User Flow

1. **Search**: Enter an event name to search for events
2. **Select**: Click on an event from the results
3. **Explore**: View the diff history with optional auto-refresh
4. **Filter**: Filter changes by category or view all

## API Endpoints Used

- `GET /api/v1/diffs/events/search?query=...&limit=100` - Search for unique events
- `GET /api/v1/diffs/event/{eventId}?limit=100` - Get diff history for an event
- `GET /api/v1/diffs/health` - Health check

## Project Structure

```
src/
├── pages/
│   ├── EventSearchPage.tsx   # Search for events
│   └── EventDetailPage.tsx   # View diffs for a selected event
├── components/
│   ├── SearchBar.tsx
│   ├── DiffList.tsx
│   ├── DiffItem.tsx
│   ├── ChangeItem.tsx
│   └── Header.tsx
├── styles/                   # Component and page styles
├── types.ts                  # TypeScript types
├── api.ts                    # API client
├── App.tsx                   # Main app with routing
├── index.css                 # Global styles
└── main.tsx                  # Entry point
```

## Architecture

- **React Router**: Navigation between search and detail pages
- **EventSearchPage**: Initial search interface
- **EventDetailPage**: Shows diffs for selected event with auto-refresh
- **Component-based**: Reusable components (DiffList, DiffItem, ChangeItem)
- **Type-safe**: All types match backend DTOs exactly

## Type Safety

All types are synchronized with the Kotlin backend:
- `SasaDiff` ↔ backend DTO
- `EventSummary` ↔ backend DTO
- `ChangeRecord` ↔ backend DTO
- All enums match backend exactly

