export interface Chapter {
  id: number;
  name: string;
  status: 'done' | 'in-progress' | 'pending';
  confidence: 'low' | 'medium' | 'high';
  results?: any[];
  resultsSummary?: { total: number; avgScore: number };
}
