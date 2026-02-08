// export type StudentStatus = 'on-track' | 'at-risk';
// export type GradeCategory = 'homework' | 'quiz' | 'classwork';

// export interface Student {
//   assignmentsDueNext7: number;
//   isAtRisk: boolean;
//   id: string;
//   firstName: string;
//   lastName: string;
//   gradeLevel: 9 | 10 | 11 | 12;

//   gpa: number; // 0.0 - 4.0
//   avgGrade: number; // 0 - 100
//   attendanceRate: number; // 0 - 100

//   status: StudentStatus;
//   lastActive: string; // “2h ago”, “Yesterday”, etc (mock)
// }
export type StudentStatus = 'on-track' | 'at-risk';

export type GradeCategory = 'homework' | 'quiz' | 'classwork';

export interface GradeEntry {
  id: string;
  date: string; // ISO string
  category: GradeCategory;
  percent: number; // 0-100
  note?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'tardy';

export interface AttendanceEntry {
  id: string;
  date: string; // ISO string (we’ll use just the day)
  status: AttendanceStatus;
  note?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  gradeLevel: 9 | 10 | 11 | 12;

  gpa: number; // 0.0 - 4.0

  // ✅ These stay so my UI doesn't break (will recompute them)
  avgGrade: number; // 0 - 100
  attendanceRate: number; // 0 - 100
  status: StudentStatus;
  isAtRisk: boolean;

  assignmentsDueNext7: number;
  lastActive: string;

  // ✅ Phase 3 data
  gradeEntries: GradeEntry[];
  attendanceEntries: AttendanceEntry[];
}
