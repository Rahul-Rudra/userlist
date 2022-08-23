import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { UserlistComponent } from './userlist/userlist.component';
 import { AddUserComponent } from './add-user/add-user.component';
 import { EditUserComponent } from './edit-user/edit-user.component';
const routes: Routes = [
    {path: 'list',component:UserlistComponent},
    {path: 'add',component:AddUserComponent},
    {path:'edit/:id',component:EditUserComponent}
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
