// --- API Request ---

export interface SaveResultRequest {
  readonly nickname: string;
  readonly department: string;
  readonly score: number;
  readonly turnsSurvived: number;
  readonly ending: string;
}

// --- API Response ---

export interface SaveResultResponse {
  readonly success: boolean;
}

export interface RankingEntry {
  readonly rank: number;
  readonly nickname: string;
  readonly department: string;
  readonly score: number;
  readonly turns_survived: number;
  readonly ending: string;
  readonly created_at: string;
}

export interface RankingResponse {
  readonly rankings: RankingEntry[];
}
