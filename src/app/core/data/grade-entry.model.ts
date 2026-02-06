export interface GradeEntry {
  id: string;
  studentId: string;
  course: string;
  title: string;
  score: number; // points earned
  outOf: number; // points possible
  date: string; // ISO string
}
