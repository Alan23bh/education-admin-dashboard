import { Injectable, computed, signal } from '@angular/core';
import { Student } from './student.model';

const MOCK: Student[] = [
  {
    id: '1',
    firstName: 'Ava',
    lastName: 'Nguyen',
    gradeLevel: 10,
    gpa: 3.6,
    avgGrade: 88,
    attendanceRate: 94,
    status: 'on-track',
    lastActive: '2h ago',
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
  },
  {
    id: '10',
    firstName: 'Emma',
    lastName: 'Davis',
    gradeLevel: 11,
    gpa: 2.2,
    avgGrade: 68,
    attendanceRate: 80,
    status: 'at-risk',
    lastActive: 'Today',
  },
  // add 7 more...
];

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly _students = signal<Student[]>(MOCK);

  readonly students = computed(() => this._students());

  getById(id: string): Student | undefined {
    return this._students().find((s) => s.id === id);
  }
}
