import { TestBed } from '@angular/core/testing';
import { SubjectListPageComponent } from './subject-list-page';
import { SyllabusService } from '../../services/syllabus.service';
import { AppStateService } from '../../services/app-state.service';
import { of } from 'rxjs';
import { SAMPLE_SYLLABUS } from '../../services/sample-syllabus';

describe('SubjectListPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectListPageComponent],
      providers: [
        { provide: SyllabusService, useValue: { getSyllabusTree: () => of(SAMPLE_SYLLABUS) } },
        { provide: AppStateService, useValue: { getBoard: () => 'CBSE', getStandard: () => '5', setSubject: () => {} } }
      ]
    }).compileComponents();
  });

  it('should load subjects for board and class', () => {
    const fixture = TestBed.createComponent(SubjectListPageComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.subjects.length).toBeGreaterThan(0);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Maths');
  });

  it('should show message when no subjects', async () => {
    TestBed.overrideProvider(SyllabusService, { useValue: { getSyllabusTree: () => of({}) } });
    const fixture = TestBed.createComponent(SubjectListPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No subjects found');
  });
});
