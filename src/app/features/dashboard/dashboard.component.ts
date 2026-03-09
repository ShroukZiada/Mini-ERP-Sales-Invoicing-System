import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BidiModule } from "@angular/cdk/bidi";

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [BidiModule]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalSales = 12345;
  totalDiscount = 2345;
  totalNet = 10000;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.createSalesChart();
    this.createGrowthChart();
    this.createCategoryChart();
  }

  createSalesChart() {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        datasets: [{
          label: 'المبيعات',
          data: [500, 700, 1500, 1000, 2000, 1800],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'المبيعات الشهرية' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  createGrowthChart() {
    const ctx = document.getElementById('growthChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        datasets: [{
          label: 'نمو المبيعات',
          data: [500, 700, 1500, 1000, 2000, 1800],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true }, title: { display: true, text: 'نمو المبيعات' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  createCategoryChart() {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['موبيلات', 'أطعمة', 'مشروبات', 'أخرى'],
        datasets: [{
          label: 'نسبة المبيعات حسب الأصناف',
          data: [3000, 2000, 1000, 500],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}