import { Injectable, computed, effect, signal } from '@angular/core';
import {
  AttendanceEntry,
  AttendanceStatus,
  GradeCategory,
  GradeEntry,
  Student,
  StudentStatus,
} from './student.model';
import { ActivityItem, ActivityType } from './activity.model';

const STORAGE_KEY = 'lymanhs_students_v1';
const ACTIVITY_KEY = 'lymanhs_activity_v1';

// Risk rules
const RISK_GRADE_THRESHOLD = 70;
const RISK_ATTENDANCE_THRESHOLD = 85;

// Helper: safe clamp
const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

// Helper: unique id
const uid = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

// Helper: use YYYY-MM-DD
const todayISO = () => new Date().toISOString().slice(0, 10);

const MOCK: Omit<Student, 'gradeEntries' | 'attendanceEntries'>[] = [
  {
    id: '1',
    firstName: 'Ava',
    lastName: 'Nguyen',
    gradeLevel: 10,
    gpa: 3.6,
    avgGrade: 95,
    attendanceRate: 94,
    status: 'on-track',
    lastActive: '2h ago',
    assignmentsDueNext7: 0,
    isAtRisk: false,
  },
  {
    id: '2',
    firstName: 'Ethan',
    lastName: 'Brown',
    gradeLevel: 11,
    gpa: 2.4,
    avgGrade: 71,
    attendanceRate: 86,
    status: 'at-risk',
    lastActive: 'Yesterday',
    assignmentsDueNext7: 0,
    isAtRisk: false,
  },
  {
    id: '3',
    firstName: 'James',
    lastName: 'Williams',
    gradeLevel: 9,
    gpa: 2.1,
    avgGrade: 69,
    attendanceRate: 82,
    status: 'at-risk',
    lastActive: 'Today',
    assignmentsDueNext7: 0,
    isAtRisk: true,
  },
  {
    id: '4',
    firstName: 'Mia',
    lastName: 'Hernandez',
    gradeLevel: 12,
    gpa: 3.9,
    avgGrade: 93,
    attendanceRate: 97,
    status: 'on-track',
    lastActive: '1h ago',
    assignmentsDueNext7: 0,
    isAtRisk: false,
  },
  {
    id: '5',
    firstName: 'Noah',
    lastName: 'Johnson',
    gradeLevel: 10,
    gpa: 2.8,
    avgGrade: 74,
    attendanceRate: 88,
    status: 'at-risk',
    lastActive: '3 days ago',
    assignmentsDueNext7: 0,
    isAtRisk: false,
  },
  {
    id: '6',
    firstName: 'Sophia',
    lastName: 'Patel',
    gradeLevel: 11,
    gpa: 3.2,
    avgGrade: 81,
    attendanceRate: 92,
    status: 'on-track',
    lastActive: 'Today',
    assignmentsDueNext7: 0,
    isAtRisk: false,
  },
  {
    id: '7',
    firstName: 'Liam',
    lastName: 'Chen',
    gradeLevel: 9,
    gpa: 3.0,
    avgGrade: 78,
    attendanceRate: 90,
    status: 'on-track',
    lastActive: 'Yesterday',
    assignmentsDueNext7: 0,
    isAtRisk: false,
  },
  {
    id: '8',
    firstName: 'Isabella',
    lastName: 'Garcia',
    gradeLevel: 12,
    gpa: 2.5,
    avgGrade: 72,
    attendanceRate: 84,
    status: 'at-risk',
    lastActive: 'Today',
    assignmentsDueNext7: 0,
    isAtRisk: false,
  },
  {
    id: '9',
    firstName: 'Oliver',
    lastName: 'Martinez',
    gradeLevel: 10,
    gpa: 3.4,
    avgGrade: 85,
    attendanceRate: 95,
    status: 'on-track',
    lastActive: '2 days ago',
    assignmentsDueNext7: 0,
    isAtRisk: false,
  },
  {
    id: '10',
    firstName: 'Emma',
    lastName: 'Davis',
    gradeLevel: 11,
    gpa: 2.2,
    avgGrade: 82,
    attendanceRate: 80,
    status: 'at-risk',
    lastActive: 'Today',
    assignmentsDueNext7: 0,
    isAtRisk: false,
  },
];

function recomputeStudent(s: Student): Student {
  // Avg grade: simple mean of gradeEntries percent
  const avgFromEntries =
    s.gradeEntries.length > 0
      ? Math.round(
          s.gradeEntries.reduce((sum, g) => sum + clamp(g.percent), 0) / s.gradeEntries.length
        )
      : s.avgGrade;

  // Attendance rate: present/tardy count as present
  const attendanceFromEntries =
    s.attendanceEntries.length > 0
      ? Math.round(
          (s.attendanceEntries.filter((a) => a.status === 'present' || a.status === 'tardy')
            .length /
            s.attendanceEntries.length) *
            100
        )
      : s.attendanceRate;

  const isAtRisk =
    avgFromEntries < RISK_GRADE_THRESHOLD || attendanceFromEntries < RISK_ATTENDANCE_THRESHOLD; // comment this line out if you truly want "later"

  const status: StudentStatus = isAtRisk ? 'at-risk' : 'on-track';

  return {
    ...s,
    avgGrade: clamp(avgFromEntries),
    attendanceRate: clamp(attendanceFromEntries),
    isAtRisk,
    status,
  };
}

function hydrateSeed(): Student[] {
  return MOCK.map((s) =>
    recomputeStudent({
      ...s,
      gradeEntries: [],
      attendanceEntries: [],
    })
  );
}

function loadFromStorage(): Student[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Student[];
    // minimal hardening
    if (!Array.isArray(parsed)) return null;

    return parsed.map((s) =>
      recomputeStudent({
        ...s,
        gradeEntries: Array.isArray(s.gradeEntries) ? s.gradeEntries : [],
        attendanceEntries: Array.isArray(s.attendanceEntries) ? s.attendanceEntries : [],
      })
    );
  } catch {
    return null;
  }
}
function loadActivityFromStorage(): ActivityItem[] {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ActivityItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly _students = signal<Student[]>(loadFromStorage() ?? hydrateSeed());
  private readonly _activity = signal<ActivityItem[]>(loadActivityFromStorage());
  readonly activity = computed(() => this._activity());

  private computeAttendanceRate(entries: { status: string }[]) {
    if (!entries.length) return 0;
    const presentish = entries.filter((e) => e.status === 'present' || e.status === 'tardy').length;
    return Math.round((presentish / entries.length) * 100);
  }

  readonly students = computed(() => this._students());

  constructor() {
    effect(() => {
      const current = this._students();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    });

    effect(() => {
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(this._activity()));
    });
  }

  getById(id: string): Student | undefined {
    return this._students().find((s) => s.id === id);
  }
  private log(type: ActivityType, student: Student, meta?: ActivityItem['meta']) {
    const item: ActivityItem = {
      id: uid(),
      type,
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      timestamp: Date.now(),
      meta,
    };

    this._activity.update((prev) => [item, ...prev].slice(0, 25)); // keep last 25
  }

  // ---------- Grade CRUD ----------
  addGrade(
    studentId: string,
    payload: { category: GradeCategory; percent: number; note?: string; date?: string }
  ) {
    const entry: GradeEntry = {
      id: uid(),
      date: payload.date ?? todayISO(),
      category: payload.category,
      percent: clamp(payload.percent),
      note: payload.note?.trim() || undefined,
    };

    const before = this.getById(studentId);
    this.patchStudent(studentId, (s) => ({
      ...s,
      gradeEntries: [entry, ...s.gradeEntries],
      lastActive: 'Today',
    }));

    // ✅ activity
    if (before) {
      this.log('grade:add', before, {
        category: entry.category,
        percent: entry.percent,
        date: entry.date,
      });
    }
  }

  deleteGrade(studentId: string, entryId: string) {
    const before = this.getById(studentId);

    this.patchStudent(studentId, (s) => ({
      ...s,
      gradeEntries: s.gradeEntries.filter((g) => g.id !== entryId),
      lastActive: 'Today',
    }));

    if (before) this.log('grade:delete', before);
  }

  markAttendance(studentId: string, status: 'present' | 'absent' | 'tardy') {
    const today = todayISO();

    this._students.update((list) =>
      list.map((s) => {
        if (s.id !== studentId) return s;

        const existing = s.attendanceEntries ?? [];
        const withoutToday = existing.filter((e) => e.date !== today);
        const nextEntries = [{ id: uid(), date: today, status }, ...withoutToday];

        const rate = this.computeAttendanceRate(nextEntries);

        // ✅ activity (use current student snapshot)
        this.log('attendance:mark', s, { status, date: today });

        return recomputeStudent({
          ...s,
          attendanceEntries: nextEntries,
          attendanceRate: rate,
          lastActive: 'Today',
        });
      })
    );
  }

  deleteAttendance(studentId: string, entryId: string) {
    const before = this.getById(studentId);

    this.patchStudent(studentId, (s) => ({
      ...s,
      attendanceEntries: s.attendanceEntries.filter((a) => a.id !== entryId),
      lastActive: 'Today',
    }));

    if (before) this.log('attendance:delete', before);
  }

  // ---------- internal helper ----------
  private patchStudent(studentId: string, mutate: (s: Student) => Student) {
    this._students.update((list) =>
      list.map((s) => (s.id === studentId ? recomputeStudent(mutate(s)) : s))
    );
  }

  // optional: reset demo data button later
  resetToSeed() {
  this._students.set(hydrateSeed());
  this._activity.set([]);
}

}
