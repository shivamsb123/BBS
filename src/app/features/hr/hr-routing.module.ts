import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/leave/leave.module').then(
        (mod) => mod.LeaveModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/salary/salary.module').then(
        (mod) => mod.SalaryModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/hr-report/hr-report.module').then(
        (mod) => mod.HrReportModule
      ),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
