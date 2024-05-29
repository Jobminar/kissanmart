import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataTransferService } from '../data-transfer.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SssionStorageService } from '../sssion-storage.service';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.css'
})
export class NewAddressComponent implements OnInit{
  goToPreviousPage(): void {
    this.location.back();
  }

  isLoading:boolean=false;
  constructor(private location: Location,
              private dataShared:DataTransferService,
              private http:HttpClient,
             private router:Router,
             private sessionStorageService:SssionStorageService
              ){
    this.dataShared.getAddress(this.AddressStored)
  }
  ngOnInit(): void {
   
      
     
  }
  formData: any = {
    userId: this.sessionStorageService.userId,
  
    Type: '',
    House_no: '',
    address: '',
    area: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  };
    submitted = false;
    submitForm()
    {
      this.isLoading=true;
      this.submitted=true
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.sessionStorageService.userTocken}`
      });
      const apiUrl='https://kisan-be-odvc.onrender.com/addresses';
      this.http.post(apiUrl,this.formData,{headers}).subscribe(
        (response)=>{
          this.isLoading=false;
          alert("this address is added sucessfully")
          
          this.router.navigate(['src/app/address'])
        },
        (error) => {
          alert(error)
          console.log(error);
         this.isLoading=false
        }
      )

    }
    
    AddressStored:any=[]
    sharingAddress()
    {
      this.AddressStored.push(this.formData)
      
    }

}
