import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

import { StudentsService } from '../../core/data/students.service';
import { Student } from '../../core/data/student.model';

type AttendanceStatus = 'present' | 'absent' | 'tardy';
type AttendanceEntry = { date: string; status: AttendanceStatus };

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // ---------- KPI COMPUTEDS (needed because template uses kpis())
  totalStudents = computed(() => this.students().length);

  averageGrade = computed(() => {
    const s = this.students();
    if (!s.length) return 0;
    return Math.round(s.reduce((sum, x) => sum + x.avgGrade, 0) / s.length);
  });

  attendanceRate = computed(() => {
    const s = this.students();
    if (!s.length) return 0;
    return Math.round(s.reduce((sum, x) => sum + x.attendanceRate, 0) / s.length);
  });

  assignmentsDue = computed(() =>
    this.students().reduce((sum, x) => sum + x.assignmentsDueNext7, 0)
  );

  // if you want “At-Risk Students” KPI to match your table logic:
  atRiskStudents = computed(() => this.atRiskList().length);

  kpis = computed(() => [
    { label: 'Total Students', value: this.totalStudents(), hint: 'Active roster' },
    { label: 'Average Grade', value: `${this.averageGrade()}%`, hint: 'All classes' },
    { label: 'Attendance Rate', value: `${this.attendanceRate()}%`, hint: 'Last 30 days' },
    {
      label: 'Assignments Due',
      value: '—',
      hint: 'Phase 3: assignments',
    },

    { label: 'At-Risk Students', value: this.atRiskStudents(), hint: 'Auto-flagged' },
  ]);

  private data = inject(StudentsService);

  students = computed(() => this.data.students());

  // ✅ Recent Activity feed (from StudentsService)
  recentActivity = computed(() => this.data.activity().slice(0, 6));

  // small helpers for rendering
  activityText(item: any) {
    switch (item.type) {
      case 'attendance:mark':
        return `marked ${item.meta?.status ?? 'attendance'}`;
      case 'attendance:delete':
        return `removed an attendance entry`;
      case 'grade:add':
        return `added a ${item.meta?.category ?? 'grade'} (${item.meta?.percent ?? '?'}%)`;
      case 'grade:delete':
        return `removed a grade entry`;
      default:
        return `updated student record`;
    }
  }

  timeAgo(ts: number) {
    const diff = Date.now() - ts;
    const s = Math.floor(diff / 1000);
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  }

  // --- helpers
  private todayIso() {
    return new Date().toISOString().slice(0, 10);
  }
  private addDays(iso: string, delta: number) {
    const d = new Date(iso + 'T00:00:00');
    d.setDate(d.getDate() + delta);
    return d.toISOString().slice(0, 10);
  }
  private lastNDays(n: number) {
    const end = this.todayIso();
    return Array.from({ length: n }, (_, i) => this.addDays(end, -(n - 1 - i)));
  }

  // ---------- 1) TOP 5 (pure CSS bars)
  top5ByAvg = computed(() =>
    [...this.students()].sort((a, b) => b.avgGrade - a.avgGrade).slice(0, 5)
  );

  // ---------- 2) AT-RISK TABLE
  // Current rule: avg < 70 OR attendance < 85 (you said you’ll add this later)
  // You can toggle attendance rule on/off easily.
  atRiskList = computed(() => {
    const list = this.students()
      .map((s) => ({
        s,
        reason: this.riskReason(s),
        severity: this.riskSeverity(s),
      }))
      .filter((x) => x.reason.length > 0)
      .sort((a, b) => b.severity - a.severity);

    return list;
  });

  private riskReason(s: Student): string[] {
    const reasons: string[] = [];
    if (s.avgGrade < 70) reasons.push('Avg < 70%');
    // enable whenever you're ready:
    if (s.attendanceRate < 85) reasons.push('Attendance < 85%');
    return reasons;
  }

  private riskSeverity(s: Student): number {
    // higher = more severe
    let sev = 0;
    if (s.avgGrade < 70) sev += (70 - s.avgGrade) * 2; // grade weighs more
    if (s.attendanceRate < 85) sev += 85 - s.attendanceRate;
    return sev;
  }

  // ---------- 3) ATTENDANCE TREND (Apex line chart)
  // We compute % present each day across roster.
  // present + tardy count as present.
  attendanceWindowDays = 14;

  attendanceTrend = computed(() => {
    const days = this.lastNDays(this.attendanceWindowDays);
    const roster = this.students();

    const pctByDay = days.map((day) => {
      let marked = 0;
      let presentish = 0;

      for (const st of roster) {
        // IMPORTANT: adjust property name if yours differs
        const entries = (st as any).attendanceEntries as AttendanceEntry[] | undefined;
        if (!entries?.length) continue;

        const entry = entries.find((e) => e.date === day);
        if (!entry) continue;

        marked++;
        if (entry.status === 'present' || entry.status === 'tardy') presentish++;
      }

      // If nobody is marked that day, show null (creates a gap).
      if (marked === 0) {
        if (!roster.length) return null;
        const fallback = roster.reduce((sum, s) => sum + s.attendanceRate, 0) / roster.length;
        return Math.round(fallback);
      }
      return Math.round((presentish / marked) * 100);
    });

    return { days, pctByDay };
  });

  attendanceSeries = computed<ApexAxisChartSeries>(() => [
    {
      name: 'Attendance %',
      data: this.attendanceTrend().pctByDay,
    },
  ]);

  attendanceChart = computed<ApexChart>(() => ({
    type: 'line',
    height: 240,
    toolbar: { show: false },
    zoom: { enabled: false },
  }));

  attendanceStroke = computed<ApexStroke>(() => ({
    curve: 'smooth',
    width: 3,
  }));

  attendanceDataLabels = computed<ApexDataLabels>(() => ({
    enabled: false,
  }));

  attendanceTooltip = computed<ApexTooltip>(() => ({
    y: {
      formatter: (val) => (val == null ? 'No data' : `${val}%`),
    },
  }));

  attendanceXAxis = computed<ApexXAxis>(() => ({
    categories: this.attendanceTrend().days,
    labels: {
      formatter: (val: string | number) => String(val).slice(5), // show MM-DD
    },
  }));

  attendanceYAxis = computed<ApexYAxis>(() => ({
    min: 0,
    max: 100,
    tickAmount: 4,
    labels: {
      formatter: (val) => `${Math.round(val)}%`,
    },
  }));

  // DONUT
  gradeBuckets = computed(() => {
    const s = this.students();
    const buckets = { A: 0, B: 0, C: 0, DF: 0 };

    for (const st of s) {
      const g = st.avgGrade;
      if (g >= 90) buckets.A++;
      else if (g >= 80) buckets.B++;
      else if (g >= 70) buckets.C++;
      else buckets.DF++;
    }

    return buckets;
  });

  gradeSeries = computed<ApexAxisChartSeries>(() => [
    { name: 'Students', data: [] }, // not used for donut
  ]);

  gradeDonutSeries = computed<number[]>(() => {
    const b = this.gradeBuckets();
    return [b.A, b.B, b.C, b.DF];
  });

  gradeDonutLabels = ['A (90-100)', 'B (80-89)', 'C (70-79)', 'D/F (<70)'];

  gradeChart = computed<ApexChart>(() => ({
    type: 'donut',
    height: 260,
  }));

  gradeTooltip = computed<ApexTooltip>(() => ({
    y: { formatter: (val) => `${val} students` },
  }));
}
