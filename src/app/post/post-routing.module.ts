import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
  
const routes: Routes = [
  { path: '',redirectTo: 'posts', pathMatch: 'full'},
  { path: 'posts', component: IndexComponent },
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }