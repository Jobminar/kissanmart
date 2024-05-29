import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DataTransferService } from '../data-transfer.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Plugins } from '@capacitor/core';
import { SssionStorageService } from '../sssion-storage.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  ngOnInit(): void {
    // this.gettingAddress();
    
  }

  goToPreviousPage(): void {
    this.location.back();
  }
 
  


  addresses:any=[{
    tittle:'hello',
    add:'hello',
}];
constructor(private location: Location,
  private dataShared:DataTransferService,
  private router:Router,
  private http :HttpClient,
  private sessionStorageStorage:SssionStorageService
  
){
  this.userToken = this.sessionStorageStorage.userTocken;
  this.userId=this.sessionStorageStorage.userId;
 
  this.newAddress=this.dataShared.setAddress()
  this.gettingAddress();
}
newAddress:any[]=[]
userId:any=""
userToken:any="";
apiUrl='https://kisan-be-odvc.onrender.com/addresses/getByUserId';
gettingAddress()
{
  
  this.fetchData().subscribe(
    (response: any) => {
     
      this.formatData(response);
    },
    (error) => {
     
    }
  );
}
 requestBody:any="";
fetchData(): Observable<any> {
 
  
   this.requestBody = { userId: this.sessionStorageStorage.userId };
   
  // const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Adjust the content type if needed
    // const options = { headers: headers };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}` // Make sure spelling is correct
    });
   
  return this.http.post<any>(this.apiUrl,this.requestBody,{headers: headers});
}

formatData(response: any): void {
  this.newAddress = response; 
 
 
}

address_id:any='';
sendAddress(address:any)
{

  this.dataShared.getAddress(address)
  this.address_id=address._id
  
  this.router.navigate(['src/app/my-cart'])
}


 edit(address:any)
  {
    this.dataShared.editAddress(address)
    this.router.navigate(['src/app/edit'])
  }


  deletes(address:any)
  {
           
            const apiUrl = 'https://kisan-be-odvc.onrender.com/addresses/deleteByUserId';
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.userToken}`
          });

          const options = {
            headers: headers,
            body: { addressId: address._id,userId:this.userId }, // Include the item ID in the request body
          };

          this.http.delete(apiUrl, options).subscribe(
            (response) => {
             
             
              let index = this.newAddress.indexOf(address);
              if (index !== -1) {
                this.newAddress.splice(index, 1);
              }
            },
            (error) => {
             
            }
          );

  }
navTonewAddress()
{
  this.router.navigate(['src/app/new-address'])
}

 

}
