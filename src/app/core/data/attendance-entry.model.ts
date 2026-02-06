export type AttendanceStatus = 'present' | 'absent' | 'tardy';

export interface AttendanceEntry {
  id: string;
  studentId: string;
  date: string; // ISO string
  period: number;
  status: AttendanceStatus;
}
