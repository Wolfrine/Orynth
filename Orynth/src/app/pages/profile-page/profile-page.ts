import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { Firestore, doc, getDoc, setDoc, collection, getDocs, limit, query } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { AppStateService } from '../../services/app-state.service';
import { SyllabusService } from '../../services/syllabus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BottomNavComponent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss'
})
export class ProfilePageComponent implements OnInit {
  uid = '';
  lastLogin: Date | null = null;
  boards: { id: string; name: string }[] = [];
  classes: string[] = [];
  selectedBoard = '';
  selectedClass = '';
  school = '';
  birthDate = '';
  isAdmin = false;
  users: { uid: string; displayName: string }[] = [];
  viewUserId = '';
  private syllabus: any = {};

  constructor(
    private firestore: Firestore,
    public auth: AuthService,
    public appState: AppStateService,
    private syllabusService: SyllabusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    const uid = this.auth.getCurrentUserId();
    if (!uid) {
      return;
    }
    this.uid = uid;
    this.isAdmin = this.auth.isUserAdmin();
    if (this.isAdmin) {
      await this.loadUsers();
    }
    this.syllabusService.getSyllabusTree().subscribe(async data => {
      this.syllabus = data || {};
      this.boards = Object.keys(this.syllabus).map(id => ({ id, name: id }));
      await this.loadProfile();
    });
  }

  private async loadProfile() {
    const profileRef = doc(this.firestore, `Users/${this.uid}`);
    const snap = await getDoc(profileRef);
    const data = snap.exists() ? snap.data() as any : {};
    const profile = data.profile || {};
    this.lastLogin = data.lastLogin ? (data.lastLogin as any).toDate?.() ?? null : null;
    this.selectedBoard = profile.board || this.appState.getBoard();
    this.updateClasses();
    this.selectedClass = profile.standard || this.appState.getStandard();
    this.school = profile.school || '';
    this.birthDate = profile.birthDate || '';
  }

  private async loadUsers() {
    const usersRef = collection(this.firestore, 'Users');
    const snap = await getDocs(query(usersRef, limit(10)));
    this.users = snap.docs.map(d => ({ uid: d.id, displayName: (d.data() as any).info?.displayName || d.id }));
  }

  selectUser() {
    this.appState.setSelectedUserId(this.viewUserId);
    this.uid = this.auth.getCurrentUserId();
    this.loadProfile();
  }

  updateClasses() {
    this.classes = Object.keys(this.syllabus[this.selectedBoard] || {});
  }

  async save() {
    this.appState.setBoard(this.selectedBoard);
    this.appState.setStandard(this.selectedClass);
    if (this.auth.isLoggedIn() && !this.appState.isReadOnly()) {
      const profileRef = doc(this.firestore, `Users/${this.uid}`);
      await setDoc(profileRef, {
        profile: {
          board: this.selectedBoard,
          standard: this.selectedClass,
          school: this.school,
          birthDate: this.birthDate
        }
      }, { merge: true });
    }
  }

  async logout() {
    await this.auth.logout();
    this.appState.setBoard('');
    this.appState.setStandard('');
    await this.router.navigate(['/onboarding']);
  }
}
