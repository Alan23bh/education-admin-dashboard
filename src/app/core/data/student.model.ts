export type StudentStatus = 'on-track' | 'at-risk';

export interface Student {
  assignmentsDueNext7: number;
  isAtRisk: boolean;
  id: string;
  firstName: string;
  lastName: string;
  gradeLevel: 9 | 10 | 11 | 12;

  gpa: number; // 0.0 - 4.0
  avgGrade: number; // 0 - 100
  attendanceRate: number; // 0 - 100

  status: StudentStatus;
  lastActive: string; // “2h ago”, “Yesterday”, etc (mock)
}
