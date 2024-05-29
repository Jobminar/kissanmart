import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { SssionStorageService } from './sssion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userTocken: any;
  show:boolean=false;
  constructor(private http: HttpClient,
    private sessionStroage:SssionStorageService,
    private sanitizer: DomSanitizer) {
    this.assigningToCat()
  }
  
  private apiUrl = 'https://kisan-be-odvc.onrender.com/get-offer';

  fetchData(): Observable<any> {
    this.show=true
    this.userTocken=this.sessionStroage.userTocken;
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Uncomment and add your token if authorization is needed
      'Authorization': `Bearer ${this.userTocken}`
    });
    return this.http.get<any>(this.apiUrl,{ headers: headers });
  }

  fetchQuick(): Observable<any> {
    this.show=true
    const apiUrl='https://kisan-be-odvc.onrender.com/get-quick'
    this.userTocken=this.sessionStroage.userTocken;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Uncomment and add your token if authorization is needed
      'Authorization': `Bearer ${this.userTocken}`
    });
    return this.http.get<any>(apiUrl,{ headers: headers });
  }
  offers: any[] = [
    {
     
    }
  ];
  quickPickup:any[]=
  [
    {}
  ];
  productsItems: any[] = [];
  isRemoved: boolean = false;
  dummyCat:any=[]
  dummyCount=0;

  
 formatData(response: any): void {
  
  //  console.log("result",response.items)
   const dumArry=response
   
     
    
     if (Array.isArray(dumArry)) {
       
       this.dummyCat = dumArry.map((category: any) => ({
        
         name: category.category,
        productId:category._id,
         src: `data:image/*;base64,${category.itemImage}`,
         alt: 'Product 1',
         itemname:category.itemname,
         costPerUnit: category.costPerUnit,
         count: 1,
         discount:category.discount,
         totalCost:category.costPerUnit,
         button: { buttonColor: '#00853E', originalColor: '#FF2400', buttonText: 'Add to Basket', originalText: 'Remove' } 
       
       
       
       }));
       this.dummyCount++
       this.productsItems = [].concat(...this.offers.map(category => category.products));
       
      } else {
     
      //  console.error('Invalid response format. Expected an array.', response);
     }
   
 }
 assigningToCat() {
  for (let index = 0; index < this.dummyCat.length; index++) {

      if (this.dummyCat[index].name==='offerZone') {

        if (!this.offers.some(category => category.productId === this.dummyCat[index].productId)) {

          this.offers.push(this.dummyCat[index]);
        }
      }
      if(this.dummyCat[index].name==='quickPicks')
      {
        if (!this.quickPickup.some(category => category.productId === this.dummyCat[index].productId)) {

          this.quickPickup.push(this.dummyCat[index]);
        }
      }

}
}

  private buttonState: { color: string; text: string } = {
    color: '#00853E',
    text: 'Add to Basket',
  };

  getButtonState(): { color: string; text: string } {
    return this.buttonState;
  }

  updateButtonState(color: string, text: string,index:any): void {
  
  }
gettingAds():Observable<any>{
  console.log("gettingAds");
  const apiUrl='https://kisan-be-odvc.onrender.com/get-home'
  return this.http.get<any>(apiUrl)
}
  
}
