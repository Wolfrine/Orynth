import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LogEntry {
  level: 'log' | 'error' | 'warn';
  message: string;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class LogService {
  private logsSubject = new BehaviorSubject<LogEntry[]>([]);
  logs$ = this.logsSubject.asObservable();

  constructor() {
    const origLog = console.log.bind(console);
    console.log = (...args: any[]) => {
      this.add('log', args);
      origLog(...args);
    };

    const origError = console.error.bind(console);
    console.error = (...args: any[]) => {
      this.add('error', args);
      origError(...args);
    };

    const origWarn = console.warn.bind(console);
    console.warn = (...args: any[]) => {
      this.add('warn', args);
      origWarn(...args);
    };
  }

  private add(level: 'log' | 'error' | 'warn', args: any[]) {
    const text = args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ');
    const entry: LogEntry = { level, message: text, timestamp: new Date() };
    const current = this.logsSubject.value;
    const updated = [...current, entry].slice(-200);
    this.logsSubject.next(updated);
  }
}
