import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm:FormGroup | any;
  id:number=0;
  file:any;
  constructor(private userService:UserService,private router:Router,private activatedRoute:ActivatedRoute) { 
    this.userForm=new FormGroup({
      first_name:new FormControl('',[Validators.required]),
      last_name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      avatar:new FormControl()
     })

 
  }

  ngOnInit(): void {
 this.activatedRoute.params.subscribe((res)=>{
   this.id=res['id']
    this.userService.getUserById(res['id']).subscribe((data:any)=>{
       this.userForm.get('first_name').setValue(data.data.first_name);
       this.userForm.get('last_name').setValue(data.data.last_name)
       this.userForm.get('email').setValue(data.data.email);
       this.userForm.get('avatar').setValue(data.data.avatar);
    })
 })
  }
 

  cancel(){
this.router.navigate(['user/list'])
  }


  submit(){
    let formdata:any=new FormData();
    formdata.append('first_name',this.userForm.value.first_name)
    formdata.append('last_name',this.userForm.value.last_name)
    formdata.append('email',this.userForm.value.email)
    if(this.file)
       formdata.append('avatar',this.file);

    if(this.userForm.valid){
         this.userService.update(this.id,this.file?formdata:this.userForm.value).subscribe();
         this.router.navigate(['user/list'])
    }
  }

  selectedFile(ev:any){
    this.file=ev.target.files[0];
  }
}
