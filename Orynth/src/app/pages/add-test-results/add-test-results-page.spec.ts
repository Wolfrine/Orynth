import { TestBed } from '@angular/core/testing';
import { AddTestResultsPageComponent } from './add-test-results-page';
import { TestResultsService } from '../../services/test-results.service';
import { of } from 'rxjs';
import { AppStateService } from '../../services/app-state.service';
import { Router } from '@angular/router';

describe('AddTestResultsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTestResultsPageComponent],
      providers: [
        { provide: TestResultsService, useValue: { getTestResults: () => of([]), addTestResult: () => Promise.resolve() } },
        { provide: AppStateService, useValue: { getChapter: () => 'Chap', setChapter: () => {} } },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AddTestResultsPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
