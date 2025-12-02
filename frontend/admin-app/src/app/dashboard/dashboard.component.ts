import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

interface KPIStat {
  title: string;
  value: number;
  displayValue: string;
  icon: string;
  color: string;
  change: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Animated KPI values
  kpiStats: KPIStat[] = [
    { title: 'Total Users', value: 0, displayValue: '0', icon: '👥', color: 'from-purple-500 to-purple-600', change: '+12.5%' },
    { title: 'Active Users', value: 0, displayValue: '0', icon: '✓', color: 'from-pink-500 to-pink-600', change: '+8.2%' },
    { title: 'Revenue', value: 0, displayValue: '$0', icon: '💰', color: 'from-orange-500 to-orange-600', change: '+23.1%' },
    { title: 'Conversion', value: 0, displayValue: '0%', icon: '📈', color: 'from-green-500 to-green-600', change: '+5.4%' }
  ];

  private targetValues = [1247, 892, 54320, 68];
  private animationIntervals: any[] = [];

  // Area Chart Configuration
  areaChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [8200, 9500, 12300, 7800, 11200, 15600, 13400],
      label: 'Weekly Revenue',
      fill: true,
      tension: 0.4,
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      pointRadius: 6,
      pointBackgroundColor: '#8b5cf6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  };

  areaChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: '#6b7280', font: { size: 12 } } },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        cornerRadius: 8,
        titleColor: '#fff',
        bodyColor: '#e5e7eb'
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
        ticks: { color: '#9ca3af' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  // Bar Chart Configuration
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [450, 620, 890, 560, 780, 1120, 940],
      label: 'User Engagement',
      backgroundColor: '#ec4899',
      borderRadius: 8,
      borderSkipped: false
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: '#6b7280', font: { size: 12 } } },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
        ticks: { color: '#9ca3af' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  // Pie Chart Configuration
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Electronics', 'Fashion', 'Home', 'Sports', 'Books'],
    datasets: [{
      data: [35, 25, 20, 12, 8],
      backgroundColor: ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']
    }]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true, 
        position: 'right',
        labels: { color: '#6b7280', font: { size: 12 } }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        cornerRadius: 8
      }
    }
  };

  // Line Chart Configuration
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [1240, 1580, 2100, 1450, 1890, 2450, 2120],
      label: 'Sessions',
      borderColor: '#f59e0b',
      backgroundColor: 'transparent',
      pointRadius: 5,
      pointBackgroundColor: '#f59e0b',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      tension: 0.4
    }]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: '#6b7280', font: { size: 12 } } },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
        ticks: { color: '#9ca3af' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  ngOnInit() {
    this.animateCounters();
  }

  ngOnDestroy() {
    this.animationIntervals.forEach(interval => clearInterval(interval));
  }

  private animateCounters() {
    this.kpiStats.forEach((stat, index) => {
      const target = this.targetValues[index];
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.value = target;
          stat.displayValue = this.formatValue(target, index);
          clearInterval(interval);
        } else {
          stat.value = Math.floor(current);
          stat.displayValue = this.formatValue(Math.floor(current), index);
        }
      }, 16);

      this.animationIntervals.push(interval);
    });
  }

  private formatValue(value: number, index: number): string {
    switch(index) {
      case 2: return `$${value.toLocaleString()}`;
      case 3: return `${value}%`;
      default: return value.toLocaleString();
    }
  }
}