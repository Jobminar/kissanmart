import { Component ,ElementRef,OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { DataTransferService } from '../data-transfer.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../cart.service';
// import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SssionStorageService } from '../sssion-storage.service';
import confetti from 'canvas-confetti'
declare var Razorpay: any;
@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})
export class MyCartComponent implements OnInit{


  goToPreviousPage(): void {
    this.location.back();
  }


  address:any[]
  excludedKeys: string[] = ['__v', '_id', 'userId','Type'];
   dummy:any[]=[]
   sharedArray:any=this.cartService.cartResponse;
   senduserId:any;

   ngOnInit(): void {
   this.senduserId=this.sharedDataService.userId
   const userToken = this.sessionStorage.userTocken
   const userId=this.sessionStorage.userId
   
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}` // Make sure spelling is correct
  });
    this.cartService.fetchData(userId,userToken).subscribe(
      (response) => {
        this.dummy = response;
        this.assignValue(response);
        this.cartService.formatData(response);
      },
      (error) => {
       
      }
     
    );
    this.delivaryCharges=0;
    this.handlingCharges=0;
    this.address=this.sharedDataService.addressShared
    this.defalutMrp()
  }
  userName:any=''
  userNumber:any=''
  userEmail:any=''

  constructor(
    private sharedDataService: DataTransferService,
    private location: Location,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cartService:CartService,
    private http:HttpClient,
    private sessionStorage:SssionStorageService,
   
    // private razorpayService:RazorpayService,
    
    ) 
    {
      this.sharedDataService.getSharedArray();
      this.sharedArray =this.cartService.cartResponse;
     
     
        this.payments=this.sharedDataService.getPayMethod();
        this.sharedArrayVegetable=this.sharedDataService.getSharedArrayVegetable();
        this.sharedArrayOffer=this.sharedDataService.getSharedArrayOffers();
        this .noOfCartItems=this.sharedDataService.totalItems
      // this. updateTotalPrice(); 


      this.cartService.getCartData().subscribe((cartData) => {
        this.sharedArray = cartData;
        this.updateTotalPrice();
      });
     
      this.address=this.sharedDataService.addressShared;
      this.assigingAddress(this.sharedDataService.addressShared)
      this.userId=this.sessionStorage.userId;
      this.userName=this.sessionStorage.userName
      this.userNumber=this.sessionStorage.phoneNumber;
      this.userEmail=this.sessionStorage.email

     
  }
  
  doSomethingWithSharedArray() {
   
    this.sharedArray = this.dummy;
    localStorage.setItem('cartItems', JSON.stringify(this.sharedArray)); // Save to local storage
    this.cdr.detectChanges();
   
  }
  
      
  assignValue(data:any[])
  {
    data.forEach(item => this.sharedArray.push(item));
  }
 

  delivaryCharges:number=0;
  handlingCharges:number=0;

  grandTotal:number=0
  totalCost=0;
  individual=0;
  cost:any;
  total: number = 0;
  totalFriuts:number=0;
  totalVegetables:number=0;
  totalOffersPrice:number=0;
  defalutMrp()
 {
  this.totalFriuts = this.sharedArray.reduce(
    (acc:any, item:any) => acc + this.calculateTotalPrice(item),
    0
  );
  this.totalVegetables = this.sharedArrayVegetable.reduce(
    (acc:any, item:any) => acc + this.calculateTotalPrice(item),
    0
  );
  this.totalOffersPrice = this.sharedArrayOffer.reduce(
    (acc:any, item:any) => acc + this.calculateTotalPrice(item),
    0
  );
  this.total=this.totalFriuts+this.totalVegetables+this.totalOffersPrice
  
  this.grandTotalPrice();
 }

 grandTotalPrice()
 {
  setTimeout(() => {
   
  
  console.log(this.total);
  if (this.total<=100) {
    this.cartService.getingCharges().subscribe((data:any)=>{
    
      this.delivaryCharges=data.deliveryCharges;
      this.handlingCharges=data.handlingCharges;
      console.log(this.delivaryCharges+this.total+this.handlingCharges);
      
      this. grandTotal=(this.delivaryCharges+this.total+this.handlingCharges);
    })
     
   
   
  } else {
    this.delivaryCharges=0;
    this.handlingCharges=0;
    this. grandTotal=this.total+this.delivaryCharges+this.handlingCharges;
    this.initializeConfetti();
  }
 
  this.sharedDataService.grandTotalPrice(this.grandTotal);
  }, 1000);
 }
  calculateTotalPrice(item: any): number {
    
    if (item.offerPrice>0) {
      return item.offerPrice*item.count
    }
    else{

    return item.price;
    }
  }
  
  updateTotalPrice(): void {
    this.totalFriuts = this.sharedArray.reduce(
      (acc:any, item:any) => acc + this.calculateTotalPrice(item),
      0
    );
    this.totalVegetables = this.sharedArrayVegetable.reduce(
      (acc:any, item:any) => acc + this.calculateTotalPrice(item),
      0
    );
    this.totalOffersPrice = this.sharedArrayOffer.reduce(
      (acc:any, item:any) => acc + this.calculateTotalPrice(item),
      0
    );
    this.total=this.totalFriuts+this.totalVegetables+this.totalOffersPrice
    
    this.grandTotalPrice();
 
  } 
  
  sharedArrayVegetable:any=[]
  sharedArrayOffer:any=[];
  payments:any=[]
  noOfCartItems:any;
  userId:string='';
  
  

  addressId:string='';
  assigingAddress(add:any)
  {
    for (let index = 0; index < add.length; index++) {
      this.address=[{
        title : add[index].title,
        address:add[index].address,
        city:add[index].city,
        state:add[index].state
    }]
      this.addressId=add[index]._id;
     
    }
    
   
  }
  removeFruits(item:any)
  {
    this.sharedDataService.deltingItem(item)
    const index=this.sharedArray.indexOf(item)
    this.sharedArray.splice(index,1)
    this.updateTotalPrice();
    this.grandTotalPrice()
  }
  set()
  {
    this .noOfCartItems=this.sharedDataService.totalItems
   
  }
 
  
  
   
   selectAddress()
  {
    this.router.navigate(['src/app/address']);
  }
  addNewAdd()
  {
    this.router.navigate(['src/app/new-address'])
  }
  selectPayment()
  {
    this.router.navigate(['src/app/payment'])
  }
  selectChange()
  {
    this.router.navigate(['src/app/payment'])
  }
  
  SendingCartToOrder() {
   
    
    const apiUrl = 'https://kisan-be-odvc.onrender.com/createorders';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.sessionStorage.userTocken}`
    });
  
    const add: any = this.sharedDataService.addressShared;
   
    
    const httpRequests = [];
   
    const currentDate = new Date();
   
    for (let index = 0; index < this.sharedArray.length; index++) {
      const element = this.sharedArray[index];
    
      const temp = {
        payment: "yes",
        count: element.count,
        orderStatus: "Pending",
        price: element.price,
        itemName:element.itemname,
        userId: add.userId,
        addressId: add._id, 
        cartIds: element._id, 
        paymentId: this.payment_id,
        itemImage: element.itemImage,
        currentDate:currentDate
      };
      
      
      this.http.post(apiUrl,temp,{headers:headers}).subscribe(
        (responses) => {
           
              this.removingfromCart(this.sharedArray)
             
            },
            (error) => {
              // console.error('Error making POST requests:', error);
            }
      )
    }
  
   
  }
  
  removingfromCart(removeArray:any)
  {
    for (let i= 0; i <removeArray.length; i++) {
      const element = removeArray[i];
     
     setTimeout(() => {
      this.removeFruits(element)
     
     }, 500);
      
    }
    setTimeout(() => {
      this.location.back();
     }, 1000);
  }
  
 
  payment_id:any='';
   // "key": "rzp_live_DMkJZQGjuE6r0Q", 
  options = {
   
    "key": "rzp_live_pbJYaEW4zKJXLH",
    "amount": 0, 
    "currency": "INR",
    "name": "Kissan Mart", //your business name
    "description": "Test Transaction",
    "image": "assets\home\kissanmart2 re.png",
    "order_id": "", 
    "payment_capture": '1', // Auto capture enabled
   
    // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    handler: (response: any) => {
      
    
      this.payment_id=response.razorpay_payment_id;
      window.alert(response)
      
      this.SendingCartToOrder();
      if (response.razorpay_payment_id) {
        // Payment successful, redirect to home page
        this.router.navigate(['orders']); // Adjust the path as needed
    } else {
        // Payment failed or was canceled
      
        // Handle the failure scenario as needed
    }
    
    },
    "prefill": { 
        "name": this.userName, 
        "email": this.userEmail,
        "contact": this.userNumber 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
    
  }



  rzp1:any;
  showWarning:boolean=false

  initiatePayment() {
  console.log(this.userNumber);
    if (this.sharedArray.length===0) {
      alert("please select the item to order")
    } else {
      
    
      if (this.address.length===0) {
        alert("please select the address")
      } else {
        
        let dynamicAmount = this.grandTotal;
        // let dynamicAmount =  100;
        
        this.options.amount = dynamicAmount;
        this.gettingOrderDetails(dynamicAmount);
          this.showWarning=false
          // this.rzp1 = new Razorpay(this.options);
          // this.rzp1.open();
        
      }
    }

  }

  gettingOrderDetails(amount:any)
  {

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.sessionStorage.userTocken}`
    // });
  
   const apiUrl='https://kisan-be-odvc.onrender.com/create-order'
    const requestBody={
        amount: amount,
        currency: "INR",
        receipt: "rcptid_11",
        // partial_payment: true,
        // first_payment_min_amount: 23000
    
    }
    // const Username = 'rzp_test_JANYEtal3mvB3Z';
    // const Password = 'aWs6usiNGvuiV7Z24iYAmD2o';
    // const base64Credentials = btoa(`${Username}:${Password}`);
    
    // Create HttpHeaders object with the Authorization header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': ` ${base64Credentials}`
    });
   
    this.http.post(apiUrl,requestBody, { headers }).subscribe(
      (responses:any) => {
        const res=responses
           
            const responseWithId = responses as { id: string }; // Type assertion
           
            this.options.order_id = responseWithId.id;
           
            this.rzp1 = new Razorpay(this.options);
            this.rzp1.open();
            // this.paymentSuccessCallback(responses)
          },
          (error) => {
           console.log(error);
          }
    )
  }
  // paymentSuccessCallback(paymentDetails: any) {
  //   window.alert(paymentDetails)
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Payment Successful',
  //     text: 'Your payment has been successfully processed.',
  //     confirmButtonText: 'OK'
  //   });
  //   this.router.navigate(['orders'])
  // }
  show=false
  initializeConfetti() {
    this.show=true
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

      ctx!.fillStyle = '#b3d9ff'; // Light blue background

  // Fill the entire canvas with the background color
  ctx!.fillRect(0, 0, canvas.width, canvas.height);
    confetti({
      particleCount: 100,
      angle: 90,
      spread: 45,
      startVelocity: 45,
      decay: 0.9,
    });

    // Add personalized text
    ctx!.font = 'bold 16px Arial';
    ctx!.textAlign = 'center';
    ctx!.textBaseline = 'middle';
    ctx!.fillStyle = '#eb1c15';
    ctx!.fillText('Congratulations!', canvas.width / 2, canvas.height / 2);
    ctx!.fillText('You have saved the delivery!', canvas.width / 2.1, canvas.height / 2 + 30);

    // Fade out the text
    this.fadeOutText(ctx!, canvas);
    this.show=false
    console.log('Task completed!');
  }

  fadeOutText(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    let opacity = 1.5;
    const fadeSpeed = 0.004;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`;
      ctx.fillText('Congratulations!', canvas.width / 2, canvas.height / 2);
      ctx.fillText('You have saved the delivery charges!', canvas.width / 2, canvas.height / 2 + 30);

      opacity -= fadeSpeed;
      if (opacity > 0) {
        
        requestAnimationFrame(animate);
      }
    };

    animate();
    
  }
}
