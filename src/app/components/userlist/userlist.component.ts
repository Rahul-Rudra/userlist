import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users$: BehaviorSubject<user[]> | undefined;
  page:number=1;
  total$:number=0
  id:number=0;
  constructor(private userService:UserService) { }
  
  ngOnInit(): void {
   this.users$=this.userService.users$;
   this.userService.totalCount$.subscribe((res)=>{
    this.total$=res
  })
   console.log(this.users$.getValue(),this.userService.totalCount$)
  }


  pageChangeEvent(event:any){
    this.page=event;
    this.userService.getusers(this.page).subscribe();
  }

  handleDelete(id:number){
   this.id=id
  }
  confirmDelete(){
    this.userService.deleteuser(this.id).subscribe();
  }

}
