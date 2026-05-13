export enum DiffType {
  INITIAL = 'INITIAL',
  UPDATE = 'UPDATE',
  NO_CHANGE = 'NO_CHANGE'
}

export enum ChangeOperation {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  REPLACE = 'REPLACE',
  MOVE = 'MOVE',
  COPY = 'COPY'
}

export enum ChangeCategory {
  EVENT = 'EVENT',
  CLOCK = 'CLOCK',
  CONFIGURATION = 'CONFIGURATION',
  GAME_STATUS = 'GAME_STATUS',
  GOALS = 'GOALS',
  CARDS = 'CARDS',
  CORNERS = 'CORNERS',
  FREE_KICKS = 'FREE_KICKS',
  GOAL_KICKS = 'GOAL_KICKS',
  THROW_INS = 'THROW_INS',
  SUBSTITUTIONS = 'SUBSTITUTIONS',
  PENALTIES = 'PENALTIES',
  VAR_INCIDENTS = 'VAR_INCIDENTS',
  OFFSIDES = 'OFFSIDES',
  SHOTS = 'SHOTS',
  SAVES = 'SAVES',
  INTERCEPTIONS = 'INTERCEPTIONS',
  FOULS = 'FOULS',
  POSSIBLES = 'POSSIBLES',
  TEAMS = 'TEAMS',
  PLAYERS = 'PLAYERS',
  MODEL_INPUTS = 'MODEL_INPUTS',
  OTHER = 'OTHER'
}

export interface ChangeRecord {
  operation: ChangeOperation;
  path: string;
  previous_value?: any;
  new_value?: any;
  category: ChangeCategory;
}

export interface AuditDiff {
  event_id: number;
  event_name: string;
  timestamp: string;
  diff_type: DiffType;
  changes: ChangeRecord[];
  previous_message_hash?: string;
  current_message_hash: string;
}

export interface EventSummary {
  eventId: number;
  eventName: string;
}

