import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SssionStorageService } from './sssion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VegetablesService {

  private apiUrl = 'https://kisan-be-odvc.onrender.com/get-vegetables';

  categories: any[] = [
    {
     
    }
  ];
  productsItems: any[] = [];
  isRemoved: boolean = false;
  userTocken=this.sessionStrore.userTocken;
  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,
            private sessionStrore:SssionStorageService) {
    this.assigningToCat()
  }

  fetchData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Uncomment and add your token if authorization is needed
      'Authorization': `Bearer ${this.userTocken}`
    });
    return this.http.get<any>(this.apiUrl,{ headers: headers });
  }

  updateButtonState(color: string, text: string, index: any): void {
    this.productsItems[index].button.color = color;
    this.productsItems[index].button.text = text;

    if (this.isRemoved) {
      this.productsItems[index].button.color = 'green';
      this.productsItems[index].button.text = 'Add to Basket';
    }
  }

  fetchAdditionals():Observable<any>
  {
    const apiUrl='https://kisan-be-odvc.onrender.com/get-additional'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Uncomment and add your token if authorization is needed
      'Authorization': `Bearer ${this.userTocken}`
    });

    return this.http.get<any>(apiUrl,{ headers: headers });

  }

  fetchLeafyVegetables():Observable<any>
  {
    const apiUrl='https://kisan-be-odvc.onrender.com/get-leaf'
    const headers=new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization':`Bearer ${this.userTocken}`
    })

    return this.http.get<any>(apiUrl,{headers:headers})
  }
 dummyCat:any=[]
 dummyCount=0;
formatData(response: any): void {
  

  const dumArry=response

    if (Array.isArray(dumArry)) {
    
      this.dummyCat = dumArry.map((category: any) => ({
       
        category: category.category,
        products:[
        {
        productId:category._id,
        src: `data:image/*;base64,${category.itemImage}`,
        alt: 'Product 1',
        itemname:category.itemname,
        costPerUnit: category.costPerUnit,
        count: 1,
        totalCost:category.costPerUnit,
        button: { buttonColor: '#00853E', originalColor: '#FF2400', buttonText: 'Add to Basket', originalText: 'Remove' } 
      }]
      
      
      }));
      this.dummyCount++
  
      this.productsItems = [].concat(...this.categories.map(category => category.products));
    } else {
    
      // console.error('Invalid response format. Expected an array.', response);
    }
  
}

assigningToCat() {
  for (let index = 0; index < this.dummyCat.length; index++) {
    const categoryIndex = this.categories.findIndex(cat => cat.category === this.dummyCat[index].category);

    if (categoryIndex !== -1) {
     
      const category = this.categories[categoryIndex];
      const dummyProducts = this.dummyCat[index].products;

      if (!category.products) {
       
        category.products = [];
      }

     
      for (const product of dummyProducts) {
        if (!category.products.some((p: { productId: any; }) => p.productId === product.productId)) {
          category.products.push(product);
        }
      }
    } else {
      // Category is not present in the categories array, add the entire category
      this.categories.push({ ...this.dummyCat[index] });
    }
  }

  
}

}
