export type AttendanceStatus = 'Present' | 'Absent' | 'Tardy';

export interface AttendanceEntry {
  id: string;
  studentId: string;
  date: string; // ISO string
  period: number;
  status: AttendanceStatus;
}
