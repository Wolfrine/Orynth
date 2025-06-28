export interface Chapter {
  id: number;
  name: string;
  status: 'done' | 'in-progress' | 'pending';
  confidence: number;
}
