import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SyllabusService {
  private syllabusUrl = 'https://asia-south1-gt-shared-service.cloudfunctions.net/api/syllabus';
  private cachedSyllabusData: any = null;

  constructor(private http: HttpClient) {}

  getSyllabusTree(): Observable<any> {
    if (this.cachedSyllabusData) {
      return of(this.cachedSyllabusData);
    }
    return this.http.get(this.syllabusUrl).pipe(
      tap(data => this.cachedSyllabusData = data),
      catchError(error => {
        console.error('Syllabus API error:', error);
        return of({});
      })
    );
  }
}
