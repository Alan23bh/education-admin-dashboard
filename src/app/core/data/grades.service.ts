import { Injectable, computed, signal } from '@angular/core';
import { GradeEntry } from './grade-entry.model';

const MOCK_GRADES: GradeEntry[] = [
  {
    id: 'g1',
    studentId: '1',
    course: 'Algebra',
    title: 'Quiz 2',
    score: 18,
    outOf: 20,
    date: '2026-02-01',
  },
  {
    id: 'g2',
    studentId: '1',
    course: 'Biology',
    title: 'Lab Report',
    score: 45,
    outOf: 50,
    date: '2026-02-03',
  },
  {
    id: 'g3',
    studentId: '3',
    course: 'English',
    title: 'Essay',
    score: 62,
    outOf: 100,
    date: '2026-02-02',
  },
];

@Injectable({ providedIn: 'root' })
export class GradesService {
  private readonly _grades = signal<GradeEntry[]>(MOCK_GRADES);
  readonly grades = computed(() => this._grades());

  byStudent(studentId: string) {
    return this._grades().filter((g) => g.studentId === studentId);
  }
}
