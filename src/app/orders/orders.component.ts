import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataTransferService } from '../data-transfer.service';
import { OrdersService } from '../orders.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SssionStorageService } from '../sssion-storage.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  excludedKeys: string[] = ['__v', '_id', 'userId', 'Type', 'country'];
  address: any[] = [];
  orders: any[] = [];
  total: number = 0;
  deliveryCharges: number = 0;
  handlingCharges:number=0;
  grandTotal: number = 0;
  timer: number = 30; // 10 minutes in seconds
  userId: any = '';
  addressId: any = "";

  constructor(
    private location: Location,
    private orderService: OrdersService,
    private dataTransferService: DataTransferService,
    private http: HttpClient,
    private sessionStrorage:SssionStorageService,
    private cartService:CartService
  ) {
    this.address = this.dataTransferService.addressShared;
    this.userId = this.dataTransferService.userId;

    setTimeout(() => {
      this.calculatingMoney();
    }, 1000);
  }

  ngOnInit(): void {
    
    // setTimeout(() => {
    //   this.gettingItems();
    // }, 1000);
    this.gettingItems();
    // setTimeout(() => {
    //   this.calculatingMoney();
    // }, 1800);
    setInterval(() => {
      this.timer--;
    }, 1000);

    setTimeout(() => {
      this.gettingAddress();
    }, 1000);
  }

  showContainer:any;
 
  gettingItems() {
    this.orderService.fetchData().subscribe(
      (response) => {
       
        this.orderService.formatData(response);
        this.orders = response.filter((order: { orderStatus: string; }) => order.orderStatus === 'Pending');
       console.log(this.orders.length);
        if (this.orders.length<=0) {
          this.showContainer=false
        } else {
          this.showContainer=true
        }
        this.orders.forEach(element => {
        this.addressId = element.addressId;
        const orderTime = new Date(element.currentDate).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - orderTime;
        
        this.calculatingMoney();
        this.gettingAddress();
          if (timeDifference > 600000) {
              this.hideRemoveButton();
          }
          else {
              setTimeout(() => {
                this.hideRemoveButton();
              }, 600000 - timeDifference);
          }
        });
      },
      (error) => {
       
      }
    );
  }

  calculatingMoney() {
    
    this.total = 0;
    for (let i = 0; i < this.orders.length; i++) {
      this.total += this.orders[i].price;
    }
    if (this.total<=100) {
      this.cartService.getingCharges().subscribe((data:any)=>{
       
        this.deliveryCharges=data[0].deliveryCharges;
        this.handlingCharges=data[0].handlingCharges;
       
        this. grandTotal=(this.deliveryCharges+this.total+this.handlingCharges);
      })
     
     
    } else {
      this.deliveryCharges=0;
      this.handlingCharges=0;
      this. grandTotal=(this.total);
    }
    
  }

  hideRemoveButton() {
    // this.showRemoveButton = false;
  }

  goToPreviousPage(): void {
    this.location.back();
  }

  apiUrl = 'https://kisan-be-odvc.onrender.com/addresses/getByUserId';

  gettingAddress() {
   
  
    this.fetchData().subscribe(
      (response: any) => {
      
        this.formatData(response);
      },
      (error) => {
       
      }
    );
  }

  requestBody: any = "";

  fetchData(): Observable<any> {
    this.requestBody = { userId: this.sessionStrorage.userId };
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.sessionStrorage.userTocken}`
    });
 
    
    return this.http.post<any>(this.apiUrl, this.requestBody,{ headers: headers });
  }

  formatData(response: any): void {
   
    for (let i = 0; i < response.length; i++) {
      const element = response[i];
     
      this.address=element;
      // if (element._id == this.addressId) {
      //   this.address = element;
      //   console.log(this.address);
      // }
    }
   
  }

  shouldShowCancelButton(item: any): boolean {
    const orderTime = new Date(item.currentDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - orderTime;
    // console.log(timeDifference);
    // console.log(orderTime,currentTime);
    return timeDifference <= 600000;
  }

  cancel(item: any) {
    const apiUrl = 'https://kisan-be-odvc.onrender.com/orderId/status';
    const requestBody = {
      orderId: item._id,
      newOrderStatus: "cancel"
    };
    this.http.put(apiUrl, requestBody).subscribe(
      (response) => {
       
        this.removingFromOrder(item);
        this.calculatingMoney();
        // alert("Order Is Cancelled");
      },
      (error) => {
       
      }
    );
  }

  removingFromOrder(item: any) {
    const index = this.orders.indexOf(item);
    this.orders.splice(index, 1);
    // Swal.fire({
    //   title: 'Order Is Cancelled',
    //   icon: 'success',
    //   timer: 2000, // 2 seconds
    //   timerProgressBar: true,
    //   showConfirmButton: false
    // });
    alert("Order Is Cancelled");
  }

}
