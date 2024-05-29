import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SssionStorageService } from './sssion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FruitsService {
  private apiUrl = 'https://kisan-be-odvc.onrender.com/get-fruits';

  categories: any[] = [
    {
     
    }
  ];
  productsItems: any[] = [];
  isRemoved: boolean = false;

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,
              private sessionStorage:SssionStorageService) {
    // this.assigningToCat()
    if (this.categories.length===0) {
      this.assigningToCat()
    }
  }

  // Method to fetch data from the API
  fetchData(): Observable<any> {
  
    const userTocken=this.sessionStorage.userTocken
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Uncomment and add your token if authorization is needed
      'Authorization': `Bearer ${userTocken}`
    });
    return this.http.get<any>(this.apiUrl,{headers});
  }

  // Method to update button state
  updateButtonState(color: string, text: string, index: any): void {
    this.productsItems[index].button.color = color;
    this.productsItems[index].button.text = text;

    if (this.isRemoved) {
      this.productsItems[index].button.color = 'green';
      this.productsItems[index].button.text = 'Add to Basket';
    }
  }

  
 dummyCat:any=[]
 dummyCount=0;
formatData(response: any): void {
  

  const dumArry=response
  
    
   
    if (Array.isArray(dumArry)) {
      // Assuming response is an array of categories
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
        totalCost:category.costPerUnit ,
        button: { buttonColor: '#00853E', originalColor: '#FF2400', buttonText: 'Add to Basket', originalText: 'Remove' } 
      }]
      
      
      }));
      this.dummyCount++
      
      
      this.productsItems = [].concat(...this.categories.map(category => category.products));
    } else {
    
     
    }
  
}

assigningToCat() {
  for (let index = 0; index < this.dummyCat.length; index++) {
    const categoryIndex = this.categories.findIndex(cat => cat.category === this.dummyCat[index].category);

    if (categoryIndex !== -1) {
      // Category is present in the categories array
      const category = this.categories[categoryIndex];
      const dummyProducts = this.dummyCat[index].products;

      if (!category.products) {
        // Ensure 'products' array exists in the category
        category.products = [];
      }

      // Push individual elements using spread operator if not already present
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
