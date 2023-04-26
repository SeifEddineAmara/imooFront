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

  //ach
//  selectedFile!:File;
  advertising : Advertising=new Advertising();

  constructor(public dialogRef: MatDialogRef<AdvertisingAddEditComponent>,
        private router:Router,//ach
    private cs:AdvertisingService//ach
    ) { }
  
  
  
  ngOnInit(): void {
    this.initAdvertising();
    this.initForm()
  }

  //ach
 /* onFileSelected(event: any) {
    this.selectedFile= event.target.files[0];
    this.advertising.image=this.selectedFile.name ;

    console.log(this.advertising.image);
  }*/
  


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
    this.advertisingForm.valueChanges.subscribe(
      data => console.log(data)
    )
  }
  confirm() {
   this.dialogRef.close(this.advertisingForm.value)
   }

  initAdvertising(){
    this.selectedAdvertising =new Advertising();
    
  }

  
  /*
 save(){
    this.cs.addAdvertising(this.advertising,this.selectedFile).subscribe({
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
  }*/


}
