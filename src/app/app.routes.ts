import { Routes } from '@angular/router';

export const routes: Routes = [
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

   {
      path: 'dashboard',
      loadChildren: () =>
         import('./features/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
   },

   {
      path: 'masterdata',
      loadChildren: () =>
         import('./features/masterdata/masterdata.module')
            .then(m => m.MasterdataModule)
   },

   {
      path: 'sales',
      loadChildren: () =>
         import('./features/masterdata/sales/sales.module')
            .then(m => m.SalesModule)
   },
];