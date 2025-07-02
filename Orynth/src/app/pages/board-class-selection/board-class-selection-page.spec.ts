import { TestBed } from '@angular/core/testing';
import { BoardClassSelectionPageComponent } from './board-class-selection-page';
import { SyllabusService } from '../../services/syllabus.service';
import { AppStateService } from '../../services/app-state.service';
import { of } from 'rxjs';
import { SAMPLE_SYLLABUS } from '../../services/sample-syllabus';

describe('BoardClassSelectionPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardClassSelectionPageComponent],
      providers: [
        { provide: SyllabusService, useValue: { getSyllabusTree: () => of(SAMPLE_SYLLABUS) } },
        AppStateService
      ]
    }).compileComponents();
  });

  it('should load boards and classes', () => {
    const fixture = TestBed.createComponent(BoardClassSelectionPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.boards.length).toBeGreaterThan(0);
    component.selectedBoard = component.boards[0].id;
    component.nextStep();
    expect(component.classes.length).toBeGreaterThan(0);
  });

  it('should show messages when no data', () => {
    TestBed.overrideProvider(SyllabusService, { useValue: { getSyllabusTree: () => of({}) } });
    const fixture = TestBed.createComponent(BoardClassSelectionPageComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No boards found');
    component.selectedBoard = 'CBSE';
    component.nextStep();
    fixture.detectChanges();
    expect(compiled.textContent).toContain('No classes found');
  });
});
