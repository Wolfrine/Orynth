import { TestBed } from '@angular/core/testing';
import { ChapterTrackerPageComponent } from './chapter-tracker-page';
import { SyllabusService } from '../../services/syllabus.service';
import { AppStateService } from '../../services/app-state.service';
import { of } from 'rxjs';
import { SAMPLE_SYLLABUS } from '../../services/sample-syllabus';

describe('ChapterTrackerPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterTrackerPageComponent],
      providers: [
        { provide: SyllabusService, useValue: { getSyllabusTree: () => of(SAMPLE_SYLLABUS) } },
        { provide: AppStateService, useValue: { getBoard: () => 'CBSE', getStandard: () => '5', getSubject: () => 'Maths' } }
      ]
    }).compileComponents();
  });

  it('should load chapters for subject', () => {
    const fixture = TestBed.createComponent(ChapterTrackerPageComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.chapters.length).toBeGreaterThan(0);
    expect(component.chapters[0].name).toBeDefined();
  });

  it('should show message when no chapters', () => {
    TestBed.overrideProvider(SyllabusService, { useValue: { getSyllabusTree: () => of({}) } });
    const fixture = TestBed.createComponent(ChapterTrackerPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No chapters found');
  });
});
