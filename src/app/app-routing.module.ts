import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserRoutingModule } from './components/user-routing.module';
import { UserlistComponent } from './components/userlist/userlist.component';

const routes:Routes=[
  {
    path:'user',
    loadChildren: () => UserRoutingModule
  },
  {
    path: '',
    redirectTo:'user/list',
    pathMatch:'full'
  }
    
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
