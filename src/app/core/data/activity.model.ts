export type ActivityType = 'grade:add' | 'grade:delete' | 'attendance:mark' | 'attendance:delete';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  studentId: string;
  studentName: string;
  timestamp: number; // Date.now()

  // small details for display
  meta?: Record<string, string | number>;
}
