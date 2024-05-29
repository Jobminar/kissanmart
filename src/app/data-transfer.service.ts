import { Injectable,OnInit } from '@angular/core';
import { Subject, isEmpty } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SssionStorageService } from './sssion-storage.service';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataTransferService implements OnInit{

  logInStatus:boolean=false;
  userNames:any='';
  UserNumber:number=0;
  userEmail:string='';
  userToken:any;


  private notifyChildSubject = new Subject<void>();
  notifyChild$ = this.notifyChildSubject.asObservable();

  notifyChild(): void {
    this.notifyChildSubject.next();
  }

  ngOnInit(): void {
   this.logIn()
  }
  constructor(private http:HttpClient,
    private sessionStorage: SssionStorageService,
    private cartService:CartService,
   private router:Router ,
  
  
   ) 
    { 
    const user = this.sessionStorage.get('userId');
   
    this.userId = user ? user._id : null;
    this.UserNumber=user ? user.phoneNumber:null;
    this.userNames=user ? user.userName:null;
    this.userEmail=user? user.email:null;
    this.userToken=this.sessionStorage.userTocken;
    this.gettingItems()
  }



  logIn()
  {
    const user = this.sessionStorage.get('userId');
    this.userId = user ? user._id : null;
    this.UserNumber=user ? user.phoneNumber:null;
    this.userNames=user ? user.userName:null;
    this.userEmail=user? user.email:null;
   

  }

  //ads----
  ads:any[]=[
    {
      src:'assets/Rectangle 2.jpg'
      
    },
    {
      src:'assets/Rectangle 2.jpg'
      
    },
    {
      src:'assets/Rectangle 2.jpg'
      
    },
    {
      src:'assets/Rectangle 2.jpg'
      
    },{
      src:'assets/Rectangle 2.jpg'
      
    }
  ]

  totalFruits:any=0;
  totalVegetables:any=0;
  private sharedArray: any[] = [];
  setSharedArray(array: any[],button:any): void {
    //this.sharedArray = array;
    if (button==='Add to Basket') {
     
      if (this.userNames===null) {
        this.logInStatus=true;
      } else {
        this.logInStatus=false
        this.sharedArray.push(array)
      this.addingItemsToCart();
      this.gettingItems()
      this.sharedArray=[]
      
      }
    } 
  
    this.totalFruits=this.sharedArray.length
   
    this.noOf()
    
  }
  getSharedArray(): any[] {
  
    
    return this.sharedArray;
    
  }

  private sharedArrayVegetable: any[] = [];
  setSharedArrayVegetable(array: any[],button:any): void {

    if (button==='Add to Basket') {
      
      if (this.userNames===null) {
        this.logInStatus=true;
      } else {
        this.sharedArray.push(array)
      this.addingItemsToCart();
      this.gettingItems()
      this.sharedArray=[]

     
      }
    } 
    
  
    this.noOf()
  }
  getSharedArrayVegetable(): any[] {
   
    return this.sharedArrayVegetable;
  }
  

  
 private sharedArrayOffers:any[]=[];
 setsharedArrayOffer(array:any[],button:any):void
  {
    if (button==='Add to Basket') {
      
      if (this.userNames===null) {
        this.logInStatus=true;
      } else {
      this.sharedArray.push(array)
      this.addingItemsToCart();
      this.gettingItems()
      this.sharedArray=[]

      
      }
    } 
   
  }
  getSharedArrayOffers(): any[] {
   
    return this.sharedArrayOffers;
  }

  
  cart:any[]=[]
 
  addingItemsToCart() {
    
    for (let index = 0; index < this.sharedArray.length; index++) {
      const element = this.sharedArray[index];
      // Assuming productId is a unique identifier for items in your arrays
      if (!this.cartService.cartResponse.find(item => item._id === element.productId)) {
        this.cart.push(element);
        
      }
    }
     for (let index = 0; index < this.sharedArrayVegetable.length; index++) {
      const element = this.sharedArrayVegetable[index];
  
    
      if (!this.cart.find(item => item.itemname === element.itemname)) {
        this.cart.push(element);
      }
    }
    for (let index = 0; index < this.sharedArrayOffers.length; index++) {
      const element = this.sharedArrayOffers[index];
  
     
      if (!this.cart.find(item => item.itemname === element.itemname)) {
        this.cart.push(element);
      }
    }
    this.postDataToBackend(this.cart);
    this.cart=[];
    
  }


  userId: string | null = null;

  postDataToBackend(cartArray: any[]) {
   this.userToken=this.sessionStorage.userTocken;
   this.userId=this.sessionStorage.userId;
    const apiUrl = 'https://kisan-be-odvc.onrender.com/cart';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}` // Make sure spelling is correct
    });
  
    for (let index = 0; index < cartArray.length; index++) {
      const element = cartArray[index];
      
       const temp = {
        
       category:element.category,
       itemname:element.itemname,
       units:element.units,
       costPerUnit:element.costPerUnit,
       discount:element.discount,
       description:element.description,
       itemImage:element.src,
       userId:this.userId,
       payment:"yes",
       count:element.count,
       orderStatus:"Pending",
       price:element.costPerUnit*element.count
      };
    
      this.http.post(apiUrl, temp, { headers } ).subscribe(
        (response) => {
        
          alert("Item added to cart successfully")
          this.gettingItems()
        },
        (error) => {
          console.error('Error making POST request:', error);
         
        }
      );
      this.cart=[]
      
    }
   

    this.cart=[]
   
    this.gettingItems()
  }


itemId:string=''
deltingItem(item:any)
{
 
    const apiUrl = 'https://kisan-be-odvc.onrender.com/cart/delete';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Uncomment and add your token if authorization is needed
      'Authorization': `Bearer ${this.sessionStorage.userTocken}`
    });

  const options = {
    headers: headers,
    body: { itemId: item._id }, // Include the item ID in the request body
  };

  this.http.delete(apiUrl, options).subscribe(
    (response) => {
     
     
      let index = this.cart.indexOf(item);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    (error) => {
      console.error('Error making DELETE request:', error);
    }
  );
}
deltingItemFromCat(item:any)
{
 
    const apiUrl = 'https://kisan-be-odvc.onrender.com/cart/delete';
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    
  });

  const options = {
    headers: headers,
    body: { itemId: item.productId
       }, 
  };

  this.http.delete(apiUrl, options).subscribe(
    (response) => {
      // console.log('Delete request successful:', response);
     
      let index = this.cart.indexOf(item);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    (error) => {
      // console.error('Error making DELETE request:', error);
    }
  );
}

countOfItems:any=0;
gettingItems()
{
  this.cartService.fetchData(this.userId, this.userToken).subscribe(
    (response) => {
     
      this.countOfItems=response.length
     
      this.cartService.formatData(response);
     
      this.notifyChild(); 
    },
    (error) => {
     
    }
  );
}


  
 
  noOf()
  {
   
    // this.totalItems=this.totalVegetables+this.totalFruits
   
  }
  totalItems:any=0
  addItemsCount(add:any)
  {
    
    if (add==true) {
      this.totalItems++
    } else {
      this.totalItems--;
    }
   
  }
  getAddItemsCount():any
  {
   
    return this.totalItems

  }

  //total amount
  grandTotal:number=0
  grandTotalPrice(grandTotal:number)
  {
    this.grandTotal=grandTotal;
  }
  getgrandTotalPrice():number
  {
    return this.grandTotal;
  }
  private PaymentMethod: any[]= [];
   setPayment(array1:any[]):void
  {
    this.PaymentMethod=array1
  }
  getPayMethod() : any[]
  {
    return this.PaymentMethod
  }

  //address------
 addressShared:any[]=[];
  getAddress(add:any)
  {
  
    this.addressShared=add;
  
  }
  setAddress():any
  {
    return this.addressShared
  }


  editingAddress:any[]=[]
  editAddress(address:any)
  {
    this.editingAddress.push(address)
    
   
  }
  getEdditing():any
  {
   
    return this.editingAddress
  }
  //password

  password:any;
  setPassword(pass:any)
  {
    this.password=pass
  }
  getPassword()
  {
    return this.password;
  }
  //signUpMain Start----
  userName:string='';
  phoneNo:number=0;
  passwordShared:string='';
  email:string='';
  setSignUpDetails(phone:number,password:any,userName:any,email:any)
  {
    this.userName=userName;
    this.phoneNo=phone;
    this.passwordShared=password;
    this.email=email
   
  }
  getSignUpDetails()
  {
    return this.phoneNo,this.passwordShared,this.userName
  }

}
