import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Advertising } from '../../models/advertising.model';
import { AdvertisingService } from '../../services/advertising.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertising-add-edit',
  templateUrl: './advertising-add-edit.component.html',
  styleUrls: ['./advertising-add-edit.component.css']
})
export class AdvertisingAddEditComponent implements OnInit {

  public advertisingForm!: FormGroup
  public selectedAdvertising!:Advertising;
public image!:string;
  //ach
  selectedFile!:File;
  advertising !: Advertising;

  constructor(public dialogRef: MatDialogRef<AdvertisingAddEditComponent>,
        private router:Router,//ach
    private cs:AdvertisingService//ach
    ) { }
  
  
  
  ngOnInit(): void {
    this.initAdvertising();
    this.initForm()
  }

  //ach
 onFileSelected(event: any) {
    this.selectedFile= event.target.files[0];
    this.image=this.selectedFile.name ;

  }
  


  initForm() {
    this.advertisingForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      nbrVuesCible: new FormControl(),
      coutParJour: new FormControl(),
      coutParVueCible: new FormControl(),
      image: new FormControl(),
      endDate: new FormControl(),
      startDate: new FormControl(),
      socityName: new FormControl(),
    });
    
  }
  confirm() {
   this.dialogRef.close(this.advertisingForm.value)
   }

  initAdvertising(){
    this.selectedAdvertising =new Advertising();
    
  }

  
  
 save(){
  const advertising:any={...{...this.advertisingForm.value,...{image:this.image}}}
 console.log(advertising);
  console.log(this.selectedFile)
  
    this.cs.addAdvertising(advertising,this.selectedFile).subscribe({
      next:(Response)=>{
        console.log(Response);
        alert("done");
      },
      error:(error)=>{
        console.log(Response);
        alert("error");
      },
      complete:()=>{
        console.log("request completed")
      }
    });
  }


}
