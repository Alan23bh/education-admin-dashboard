// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { SchoolData } from '../../core/data/school-data';

// type Kpi = {
//   label: string;
//   value: string | number;
//   sub?: string;
// };

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './dashboard.html',
//   styleUrl: './dashboard.scss',
// })
// export class Dashboard {
//   kpis: Kpi[] = [
//     { label: 'Total Students', value: 10, sub: 'Active roster' },
//     { label: 'Average Grade', value: '84%', sub: 'All classes' },
//     { label: 'Attendance Rate', value: '92%', sub: 'Last 30 days' },
//     { label: 'Assignments Due', value: 7, sub: 'Next 7 days' },
//     { label: 'At-Risk Students', value: 2, sub: 'Below 70%' },
//   ];
// }
import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolData } from '../../core/data/school-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private data = inject(SchoolData);

  students = computed(() => this.data.getStudents());

  totalStudents = computed(() => this.students().length);

  averageGrade = computed(() => {
    const s = this.students();
    if (!s.length) return 0;
    const avg = s.reduce((sum, x) => sum + x.average, 0) / s.length;
    return Math.round(avg);
  });

  attendanceRate = computed(() => {
    const s = this.students();
    if (!s.length) return 0;
    const avg = s.reduce((sum, x) => sum + x.attendanceRate, 0) / s.length;
    return Math.round(avg);
  });

  assignmentsDue = computed(() =>
    this.students().reduce((sum, x) => sum + x.assignmentsDueNext7, 0)
  );

  atRiskStudents = computed(() => this.students().filter((s) => s.isAtRisk).length);

  kpis = computed(() => [
    { label: 'Total Students', value: this.totalStudents(), hint: 'Active roster' },
    { label: 'Average Grade', value: `${this.averageGrade()}%`, hint: 'All classes' },
    { label: 'Attendance Rate', value: `${this.attendanceRate()}%`, hint: 'Last 30 days' },
    { label: 'Assignments Due', value: this.assignmentsDue(), hint: 'Next 7 days' },
    { label: 'At-Risk Students', value: this.atRiskStudents(), hint: 'Below 70%' },
  ]);
}
