import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private board = '';
  private standard = '';
  private subject = '';
  private chapter = '';

  setBoard(value: string) {
    this.board = value;
  }

  getBoard(): string {
    return this.board;
  }

  setStandard(value: string) {
    this.standard = value;
  }

  getStandard(): string {
    return this.standard;
  }

  setSubject(value: string) {
    this.subject = value;
  }

  getSubject(): string {
    return this.subject;
  }

  setChapter(value: string) {
    this.chapter = value;
  }

  getChapter(): string {
    return this.chapter;
  }
}
