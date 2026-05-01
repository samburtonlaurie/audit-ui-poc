import axios from 'axios';
import { AuditDiff, EventSummary } from './types';
import { mockEvents, mockDiffsByEvent } from './mockData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1/diffs';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

let useMock = false;

async function tryApi<T>(apiFn: () => Promise<T>, mockFn: () => T): Promise<T> {
  if (useMock) {
    return mockFn();
  }
  try {
    return await apiFn();
  } catch {
    console.warn('API unavailable, falling back to mock data');
    useMock = true;
    return mockFn();
  }
}

export const diffsApi = {
  getDiffHistory: (eventId: number, limit: number = 100): Promise<AuditDiff[]> =>
    tryApi(
      () => client.get(`/event/${eventId}`, { params: { limit } }).then(r => r.data),
      () => (mockDiffsByEvent[eventId] ?? []).slice(0, limit),
    ),

  getLatestState: (eventId: number): Promise<string> =>
    tryApi(
      () => client.get(`/event/${eventId}/latest`).then(r => r.data),
      () => '{}',
    ),

  getAllEvents: (limit: number = 100): Promise<EventSummary[]> =>
    tryApi(
      () => client.get('/events', { params: { limit } }).then(r => r.data),
      () => mockEvents.slice(0, limit),
    ),

  searchEvents: (query: string, limit: number = 100): Promise<EventSummary[]> =>
    tryApi(
      () => client.get('/events/search', { params: { query, limit } }).then(r => r.data),
      () => mockEvents
        .filter(e => e.eventName.toLowerCase().includes(query.toLowerCase()))
        .slice(0, limit),
    ),

  searchByEventName: (query: string, limit: number = 100): Promise<AuditDiff[]> =>
    tryApi(
      () => client.get('/search', { params: { query, limit } }).then(r => r.data),
      () => Object.values(mockDiffsByEvent)
        .flat()
        .filter(d => d.event_name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, limit),
    ),

  health: (): Promise<{ status: string }> =>
    tryApi(
      () => client.get('/health').then(r => r.data),
      () => ({ status: 'mock' }),
    ),

  isMockMode: () => useMock,
};

