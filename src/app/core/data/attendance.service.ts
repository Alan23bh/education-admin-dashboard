import { Injectable, computed, signal } from '@angular/core';
import { AttendanceEntry } from './attendance-entry.model';

const MOCK_ATTENDANCE: AttendanceEntry[] = [
  { id: 'a1', studentId: '1', date: '2026-02-03', period: 2, status: 'present' },
  { id: 'a2', studentId: '3', date: '2026-02-05', period: 2, status: 'absent' },
  { id: 'a3', studentId: '3', date: '2026-02-06', period: 1, status: 'tardy' },
];

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly _attendance = signal<AttendanceEntry[]>(MOCK_ATTENDANCE);
  readonly attendance = computed(() => this._attendance());

  byStudent(studentId: string) {
    return this._attendance().filter((a) => a.studentId === studentId);
  }
}
