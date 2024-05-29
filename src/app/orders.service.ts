import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DataTransferService } from './data-transfer.service';
import { SssionStorageService } from './sssion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'https://kisan-be-odvc.onrender.com/orders/';
  private cartSubject = new Subject<any[]>();
userId:any=''
  constructor(private http: HttpClient,
              private dataTranferService:DataTransferService,
              private sessionStrorage:SssionStorageService
    ) {
      
      this.userId=this.sessionStrorage.userId;
      this.apiUrl= 'https://kisan-be-odvc.onrender.com/ordersbyuserId'
     }

     fetchData(): Observable<any> {
      const requestBody = { userId: this.sessionStrorage.userId };
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.sessionStrorage.userTocken}`
      });
      return this.http.post<any>(this.apiUrl, requestBody, { headers });
    }

  addressId:any="";
  cartResponse: any[] = [];
  gettingCartItem:any[]=[];
  formatData(response: any): void {
    this.cartResponse = response;
    this.cartSubject.next(this.cartResponse);
    
  }
  assigningToCat() {
    this.gettingCartItem=this.cartResponse
   
  }
  getCartData(): Observable<any[]> {
    // console.log("checking the cartSubjecy",this.cartResponse)
    return this.cartSubject.asObservable();
  }
  totalItems:number=this.cartResponse.length


}
