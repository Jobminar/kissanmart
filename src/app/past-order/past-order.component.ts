import { Component ,OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { OrdersService } from '../orders.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTransferService } from '../data-transfer.service';
import { Observable } from 'rxjs';
import { SssionStorageService } from '../sssion-storage.service';

@Component({
  selector: 'app-past-order',
  templateUrl: './past-order.component.html',
  styleUrl: './past-order.component.css'
})
export class PastOrderComponent implements OnInit{
  pastOrders:any[]=[];
  address: any[] = [];
 
  goToPreviousPage(): void {
    this.location.back();
  }
  userId:any='';
  addressId:any="";
  constructor(
    private location: Location,
    private orderService: OrdersService,
    private dataTransferService: DataTransferService,
    private  http:HttpClient,
    private sessionStorage:SssionStorageService
  ) {
    this.address = this.dataTransferService.addressShared;
    this.userId=this.dataTransferService.userId
  }

  ngOnInit(): void {
   
    this.gettingItems();
  }
type:any;
  gettingItems() {
    this.orderService.fetchData().subscribe(
        (response) => {
            this.orderService.formatData(response);
            this.pastOrders = response;
            console.log(response);
            console.log(response.orderStatus);
            for (let i = 0; i < this.pastOrders.length; i++) {
                const order = this.pastOrders[i];
                const addressId = order.addressId;
                console.log(order.orderStatus);
                this.getAddressType(addressId).subscribe(
                    (address) => {
                       
                        const matchedAddress = address.find((addr: any) => addr._id === addressId);
                        if (matchedAddress) {

                            this.type=matchedAddress.Type   
                        } else {
                            console.error('Address not found for order:', order);
                        }
                    },
                    (error) => {
                        console.error('Error fetching address type:', error);
                    }
                );
            }

            
        },
        (error) => {
           
        }
    );
}


apiUrlAddress='https://kisan-be-odvc.onrender.com/addresses/getByUserId';
getAddressType(addressId: any): Observable<any> {
    const requestBody = { userId: this.sessionStorage.userId, addressId: addressId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.sessionStorage.userTocken}`
    });
    return this.http.post<any>(this.apiUrlAddress, requestBody);
}

order(refund:any)
{
  
  refund.orderStatus="pending";
  
}

}
