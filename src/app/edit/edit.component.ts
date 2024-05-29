import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DataTransferService } from '../data-transfer.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SssionStorageService } from '../sssion-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  goToPreviousPage(): void {
    this.location.back();
  }
  constructor(private location: Location,
              private dataShared:DataTransferService,
              private http:HttpClient,
              private sessionStroage:SssionStorageService
              )
  {
    this.dataShared.getAddress(this.AddressStored)
  }
 
  formData=
    {
      userId:this.dataShared.userId,
      title:'',
      House_no:'',
      
      address:'',
     
      city:'',
      state:'',
      country:'',
      pincode:''

    }
    submitted = false;
    submitForm()
    {
      this.submitted=true
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.sessionStroage.userTocken}`
      });
      const apiUrl='https://kisan-be-odvc.onrender.com/addresses';
      this.http.post(apiUrl,this.formData).subscribe(
        (response)=>{
          
        },
        (error) => {
         
        }
      )

    }
    
    AddressStored:any=[]
    sharingAddress()
    {
      this.AddressStored.push(this.formData)
      
    }
  
}
