import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Kpi = {
  label: string;
  value: string | number;
  sub?: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  kpis: Kpi[] = [
    { label: 'Total Students', value: 10, sub: 'Active roster' },
    { label: 'Average Grade', value: '84%', sub: 'All classes' },
    { label: 'Attendance Rate', value: '92%', sub: 'Last 30 days' },
    { label: 'Assignments Due', value: 7, sub: 'Next 7 days' },
    { label: 'At-Risk Students', value: 2, sub: 'Below 70%' },
  ];
}
