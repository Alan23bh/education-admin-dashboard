import { Injectable } from '@angular/core';

export type Student = {
  status: any;
  gradeLevel: any;
  gpa: any;
  avgGrade: any;
  lastActive: any;
  id: string;
  firstName: string;
  lastName: string;
  grade: 9 | 10 | 11 | 12;
  average: number; // 0-100
  attendanceRate: number; // 0-100
  assignmentsDueNext7: number;
  isAtRisk: boolean; // average < 70 for now
};

@Injectable({ providedIn: 'root' })
export class SchoolData {
  private students: Student[] = [
    {
      id: '1',
      firstName: 'Mia',
      lastName: 'Carter',
      grade: 12,
      average: 91,
      attendanceRate: 96,
      assignmentsDueNext7: 1,
      isAtRisk: false,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
    {
      id: '2',
      firstName: 'Noah',
      lastName: 'Reed',
      grade: 11,
      average: 77,
      attendanceRate: 90,
      assignmentsDueNext7: 2,
      isAtRisk: false,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
    {
      id: '3',
      firstName: 'Ava',
      lastName: 'Nguyen',
      grade: 10,
      average: 68,
      attendanceRate: 84,
      assignmentsDueNext7: 3,
      isAtRisk: true,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
    {
      id: '4',
      firstName: 'Liam',
      lastName: 'Johnson',
      grade: 9,
      average: 72,
      attendanceRate: 89,
      assignmentsDueNext7: 0,
      isAtRisk: false,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
    {
      id: '5',
      firstName: 'Sophia',
      lastName: 'Lopez',
      grade: 12,
      average: 88,
      attendanceRate: 94,
      assignmentsDueNext7: 1,
      isAtRisk: false,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
    {
      id: '6',
      firstName: 'Ethan',
      lastName: 'Brown',
      grade: 11,
      average: 66,
      attendanceRate: 81,
      assignmentsDueNext7: 4,
      isAtRisk: true,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
    {
      id: '7',
      firstName: 'Isabella',
      lastName: 'Kim',
      grade: 10,
      average: 79,
      attendanceRate: 92,
      assignmentsDueNext7: 2,
      isAtRisk: false,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
    {
      id: '8',
      firstName: 'Lucas',
      lastName: 'Martin',
      grade: 9,
      average: 83,
      attendanceRate: 95,
      assignmentsDueNext7: 1,
      isAtRisk: false,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
    {
      id: '9',
      firstName: 'Amelia',
      lastName: 'Patel',
      grade: 12,
      average: 74,
      attendanceRate: 88,
      assignmentsDueNext7: 2,
      isAtRisk: false,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
    {
      id: '10',
      firstName: 'James',
      lastName: 'Williams',
      grade: 11,
      average: 69,
      attendanceRate: 86,
      assignmentsDueNext7: 3,
      isAtRisk: true,
      status: undefined,
      gradeLevel: undefined,
      gpa: undefined,
      avgGrade: undefined,
      lastActive: undefined,
    },
  ];

  getStudents(): Student[] {
    return this.students;
  }

  getStudentById(id: string): Student | undefined {
    return this.students.find((s) => s.id === id);
  }
}
