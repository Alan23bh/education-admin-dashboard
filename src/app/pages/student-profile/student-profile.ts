// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-student-profile',
//   imports: [],
//   templateUrl: './student-profile.html',
//   styleUrl: './student-profile.scss',
// })
// export class StudentProfile {

// }
// import { Component, computed, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { StudentsService } from '../../core/data/students.service';

// @Component({
//   selector: 'app-student-profile',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './student-profile.html',
//   styleUrl: './student-profile.scss',
// })
// export class StudentProfile {
//   private route = inject(ActivatedRoute);
//   private students = inject(StudentsService);

//   id = computed(() => this.route.snapshot.paramMap.get('id') ?? '');
//   student = computed(() => this.students.getById(this.id()));
// }
import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService } from '../../core/data/students.service';
import { GradeCategory } from '../../core/data/student.model';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.scss',
})
export class StudentProfile {
  private route = inject(ActivatedRoute);
  private studentsService = inject(StudentsService);

  id = computed(() => this.route.snapshot.paramMap.get('id') ?? '');
  student = computed(() => this.studentsService.getById(this.id()));

  // Grade form state
  gradeCategory = signal<GradeCategory>('homework');
  gradePercent = signal<number>(90);

  addGrade() {
    const s = this.student();
    if (!s) return;
    this.studentsService.addGrade(s.id, {
      category: this.gradeCategory(),
      percent: this.gradePercent(),
    });
  }

  deleteGrade(entryId: string) {
    const s = this.student();
    if (!s) return;
    this.studentsService.deleteGrade(s.id, entryId);
  }

  // Attendance quick actions
  mark(status: 'present' | 'absent' | 'tardy') {
    const s = this.student();
    if (!s) return;
    this.studentsService.markAttendance(s.id, status);
  }

  deleteAttendance(entryId: string) {
    const s = this.student();
    if (!s) return;
    this.studentsService.deleteAttendance(s.id, entryId);
  }
}
