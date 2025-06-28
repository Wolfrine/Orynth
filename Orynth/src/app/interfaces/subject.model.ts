import { Chapter } from './chapter.model';

export interface Subject {
  id: number;
  name: string;
  progress: number;
  chapters: Chapter[];
}
