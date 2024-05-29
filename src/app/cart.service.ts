import { Injectable ,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SssionStorageService } from './sssion-storage.service';
import { DataTransferService } from './data-transfer.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  private cartSubject = new Subject<any[]>();
  userId:any='';
  userToken:any=this.sessionStorage.userTocken
  ngOnInit(): void {
    this.sessionStorage.gettingUserSetails()
    this.userId = this.sessionStorage.userId
    this.userToken=this.sessionStorage.userTocken
   
   
  }
  constructor(private http: HttpClient,
    private sessionStorage:SssionStorageService
            
    ) {
        this.sessionStorage.gettingUserSetails()
        this.userId = this.sessionStorage.userId
      
     }

  fetchData(user:any, userToken:any): Observable<any> {
    this.token=userToken;
    const userId=user
    const userTokens=userToken
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}` // Make sure spelling is correct
    });
   
    const apiUrl = `https://kisan-be-odvc.onrender.com/cart/${userId}`;
    return this.http.get<any>(apiUrl,{headers: headers});
  }

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
   
    return this.cartSubject.asObservable();
  }
  totalItems:number=this.cartResponse.length
 token:any;
  getingCharges():Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` // Make sure spelling is correct
    });
    const apiUrl='https://kisan-be-odvc.onrender.com/get-charges'
    return this.http.get<any>(apiUrl,{headers: headers})
  }
}
