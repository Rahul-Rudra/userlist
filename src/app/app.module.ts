import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
 import { UserlistComponent } from './components/userlist/userlist.component';
 import { AddUserComponent } from './components/add-user/add-user.component';
import { InputComponent } from './controls/input/input.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
 import { EditUserComponent } from './components/edit-user/edit-user.component';
import {UserRoutingModule} from './components/user-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    UserlistComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
