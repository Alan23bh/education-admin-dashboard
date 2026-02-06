import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { StudentsService } from '../../core/data/students.service';
import { Student, StudentStatus } from '../../core/data/student.model';

type FilterValue = 'all' | StudentStatus;
type SortValue = 'avgGrade' | 'attendanceRate' | 'gpa';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './students-list.html',
  styleUrl: './students-list.scss',
})
export class StudentsList {
  private studentsService = inject(StudentsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // UI state
  query = signal('');
  filter = signal<FilterValue>('all');
  sort = signal<SortValue>('avgGrade');

  students = this.studentsService.students;

  constructor() {
    // 1) Read initial state from URL on load
    const qp = this.route.snapshot.queryParamMap;

    const q = qp.get('q') ?? '';
    const f = (qp.get('filter') as FilterValue) ?? 'all';
    const s = (qp.get('sort') as SortValue) ?? 'avgGrade';

    if (q) this.query.set(q);
    if (f === 'all' || f === 'on-track' || f === 'at-risk') this.filter.set(f);
    if (s === 'avgGrade' || s === 'attendanceRate' || s === 'gpa') this.sort.set(s);

    // 2) Keep URL updated whenever user changes state
    effect(() => {
      const qVal = this.query().trim();
      const fVal = this.filter();
      const sVal = this.sort();

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          q: qVal || null,
          filter: fVal !== 'all' ? fVal : null,
          sort: sVal !== 'avgGrade' ? sVal : null,
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  filtered = computed<Student[]>(() => {
    const q = this.query().trim().toLowerCase();
    const f = this.filter();
    const sortKey = this.sort();

    let list = this.students();

    // filter
    if (f !== 'all') list = list.filter((s) => s.status === f);

    // search
    if (q) {
      list = list.filter((s) => {
        const full = `${s.firstName} ${s.lastName}`.toLowerCase();
        return full.includes(q);
      });
    }

    // sort (desc)
    list = [...list].sort((a, b) => b[sortKey] - a[sortKey]);

    return list;
  });

  countLabel = computed(() => {
    const total = this.students().length;
    const shown = this.filtered().length;
    const f = this.filter();
    const filterLabel = f === 'all' ? 'All students' : f === 'at-risk' ? 'At-risk' : 'On track';
    return `${filterLabel} • Showing ${shown} of ${total}`;
  });

  setFilter(value: FilterValue) {
    this.filter.set(value);
  }

  clearSearch() {
    this.query.set('');
  }
}
