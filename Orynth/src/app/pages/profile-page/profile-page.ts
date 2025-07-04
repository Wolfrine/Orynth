import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { AppStateService } from '../../services/app-state.service';
import { SyllabusService } from '../../services/syllabus.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BottomNavComponent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss'
})
export class ProfilePageComponent implements OnInit {
  uid = '';
  boards: { id: string; name: string }[] = [];
  classes: string[] = [];
  selectedBoard = '';
  selectedClass = '';
  school = '';
  birthDate = '';
  private syllabus: any = {};

  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private appState: AppStateService,
    private syllabusService: SyllabusService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    const user = await this.auth.signInAnonymouslyIfNeeded();
    this.uid = user.uid;
    this.syllabusService.getSyllabusTree().subscribe(async data => {
      this.syllabus = data || {};
      this.boards = Object.keys(this.syllabus).map(id => ({ id, name: id }));
      await this.loadProfile();
    });
  }

  private async loadProfile() {
    const profileRef = doc(this.firestore, `Users/${this.uid}/profile`);
    const snap = await getDoc(profileRef);
    const profile = snap.exists() ? snap.data() as any : {};
    this.selectedBoard = profile.board || this.appState.getBoard();
    this.updateClasses();
    this.selectedClass = profile.standard || this.appState.getStandard();
    this.school = profile.school || '';
    this.birthDate = profile.birthDate || '';
  }

  updateClasses() {
    this.classes = Object.keys(this.syllabus[this.selectedBoard] || {});
  }

  async save() {
    this.appState.setBoard(this.selectedBoard);
    this.appState.setStandard(this.selectedClass);
    const profileRef = doc(this.firestore, `Users/${this.uid}/profile`);
    await setDoc(profileRef, {
      board: this.selectedBoard,
      standard: this.selectedClass,
      school: this.school,
      birthDate: this.birthDate
    }, { merge: true });
  }
}
