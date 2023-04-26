import { Component, OnInit } from '@angular/core';
import { AdvertisingService } from '../../services/advertising.service';
import { Advertising } from '../../models/advertising.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdvertisingAddEditComponent } from '../advertising-add-edit/advertising-add-edit.component';

@Component({
  selector: 'app-advertising-list',
  templateUrl: './advertising-list.component.html',
  styleUrls: ['./advertising-list.component.css']
})
export class AdvertisingListComponent implements OnInit {

  public advertisingForm!: FormGroup;
  public advertisings!: Advertising[];
  selectedFile!:File;
  advertising : Advertising=new Advertising();

  constructor(
    private advertisingService: AdvertisingService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllAdvertising();
  }

  getAllAdvertising() {
    this.advertisingService.getAllAdvertisings().subscribe(
      data => {
        this.advertisings = data
      }
    )
  }


  initForm() {
    this.advertisingForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }

  getAdvertisingBetweenTwoDate() {
    this.advertisingService.getAdvertisingBetweenTwoDate(this.advertisingForm.value.start, this.advertisingForm.value.end).subscribe(
      data => {
        this.advertisings = data
      }
    )
  }

  

  addAdvertising() {
    const dialogRef = this.dialog.open(AdvertisingAddEditComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
    /*  this.advertisingService.addAdvertising(result).subscribe(
        (data: any) => {
          this.advertisings.push(data)
        }
      )*/
    });
  }
  delete(idAd: number) {
    this.advertisingService.deleteAdvertising(idAd).subscribe(
      () => {
        const newlist = this.advertisings.filter(ad => ad.idAd !== idAd);
        this.advertisings = newlist;
      }
    )
  }
  updateAdvertising(advertising: Advertising) {
    const dialogRef = this.dialog.open(AdvertisingAddEditComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.advertisingService.updateAdvertising(result).subscribe(
        (data: any) => {
          this.advertisings.push(data)
        }
      )
    });
  }
  
 

  

}
