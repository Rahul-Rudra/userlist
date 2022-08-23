import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit ,OnChanges{
  @Input() inputId:any='';
  @Input() controls:any=new FormControl();
  @Input() label:any=""
  @Input() pla:any=''
  errorMessage:Record<string,string>={
    required:"This field is required"
  }
  constructor() {
    
   }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.controls)
  }
 

  ngOnInit(): void {
  }

}
