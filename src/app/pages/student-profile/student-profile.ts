// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-student-profile',
//   imports: [],
//   templateUrl: './student-profile.html',
//   styleUrl: './student-profile.scss',
// })
// export class StudentProfile {

// }
import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService } from '../../core/data/students.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.scss',
})
export class StudentProfile {
  private route = inject(ActivatedRoute);
  private students = inject(StudentsService);

  id = computed(() => this.route.snapshot.paramMap.get('id') ?? '');
  student = computed(() => this.students.getById(this.id()));
}
