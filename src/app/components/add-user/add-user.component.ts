import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
userForm:FormGroup | any
isLoading$:boolean=false
  constructor(private userService:UserService,private router:Router,private activatedRoute:ActivatedRoute) { 
    this.userForm=new FormGroup({
      first_name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      last_name:new FormControl('',[Validators.required])
     })

 
  }

  ngOnInit(): void {
 this.activatedRoute.params.subscribe((res)=>{
    console.log(res)
 })
  }
 

  createForm(){

  }


  submit(){
   // console.log('submit')
    if(this.userForm.valid){
         this.userService.add(this.userForm.value).subscribe((res)=>
         {
           this.isLoading$=true;
           setTimeout(()=>{
             this.isLoading$=false;
           },1500)
            
        }   );
        this.userForm.reset()
         this.router.navigate(['user/list'])
         
    }
  }
}
