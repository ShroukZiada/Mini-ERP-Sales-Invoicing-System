import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component'; // Standalone

@NgModule({
  imports: [
    CommonModule,

    DashboardComponent, // Standalone component يتحط هنا
    RouterModule.forChild([
      { path: '', component: DashboardComponent }
    ])
  ]
})
export class DashboardModule { }