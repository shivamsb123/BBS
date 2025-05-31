import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveLeaveRequestComponent } from './approve-leave-request/approve-leave-request.component';
import { ApproveMispunchRequestComponent } from './approve-mispunch-request/approve-mispunch-request.component';
import { COffRequestComponent } from './c-off-request/c-off-request.component';
import { OverTimeRequestComponent } from './over-time-request/over-time-request.component';

const routes: Routes = [

  {
    path: 'Approve_leave_Request', component : ApproveLeaveRequestComponent
  },
  {
    path: 'Approve_Mispunch_Request', component : ApproveMispunchRequestComponent
  },
  {
    path: 'Coff_Request', component : COffRequestComponent
  },
  {
    path: 'Over_Time_Request', component : OverTimeRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryRoutingModule { }
