import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private board = '';
  private standard = '';
  private subject = '';
  private selectedUserId = '';

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

  setSelectedUserId(uid: string) {
    this.selectedUserId = uid;
  }

  getSelectedUserId(): string {
    return this.selectedUserId;
  }

  clearSelectedUserId() {
    this.selectedUserId = '';
  }

  isReadOnly(): boolean {
    return this.selectedUserId !== '';
  }
}
