import { Component , OnInit, ViewChild} from '@angular/core';
import { FotterComponent } from '../fotter/fotter.component';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { DataTransferService } from '../data-transfer.service';
// import { green } from '@mui/material/colors';

import { VegetablesService } from '../vegetables.service';
import { SssionStorageService } from '../sssion-storage.service';
import { LoadingComponent } from '../loading/loading.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  term:any;

  logInStatus:boolean=false;
  @ViewChild('fotter') fotter!: FotterComponent;
  @ViewChild('loading')loading!:LoadingComponent
    offers:any=this.sharedService.offers
    isLoading:any;
  quickPickUp:any=this.sharedService.quickPickup
  
  constructor(private router: Router,
              public sharedService:SharedService,
              public dataTransferService:DataTransferService,
              public vegetablesService:VegetablesService,
             private sessionStorage:SssionStorageService,
              private cartService:CartService
              ) 
    {  
     
      this.sessionStorage.gettingUserSetails();
      this.dataTransferService.gettingItems()
    }
    ads:any[]=[];
  isLoadingEffect()
  {
    if (this.quickPickUp.length===1) {
      this.isLoading=true;
    } else {
      this.isLoading=false;
    }
  }
  ngOnInit(): void {
     
    this.getads();

    this.isLoadingEffect();
    this.fetechingOffers();
    this.fetechQuickZone();
    this.dataTransferService.logIn()
    this.isLoadingEffect();
  }

  getads()
  {
    this.sharedService.gettingAds().subscribe(data => {
      
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.ads.push(element.image);
      }
    //  this.ads=data.map((item: { image: any; }) => item.image);
     
    },
    error => {
     
    });
  }
  
  fetechingOffers()
  {
    this.sharedService.fetchData().subscribe(data => {
    
      this.sharedService.formatData(data);
      this.sharedService.assigningToCat();
      this.isLoadingEffect();
    });
  }

  fetechQuickZone()
  {
    this.sharedService.fetchQuick().subscribe(data => {
     
      this.sharedService.formatData(data);
      this.sharedService.assigningToCat();
      this.isLoadingEffect();
    });
  }
  navigateToDestination() {
    this.router.navigate(['src/app/fresh-fruits.html']);
  }
  navgateToFreshVegetables()
  {
    this.router.navigate(['src/app/fresh-vegetables.html'])
  }
  
  
  showAlert:boolean=true
  
  
  toggleButtonState(offer:any): void {
    
    const button=offer.button
   
    button.buttonColor = button.buttonColor === button.originalColor ? '#00853E' :'#00853E';
    button.buttonText = button.buttonText === button.originalText ? 'Add to Basket' : 'Add to Basket';
   
    const index=offer
    this.sharedService.updateButtonState(button.buttonColor, button.buttonText,index);
  }
  increaseCount(product: any) {
    product.count++;
   product.totalCost=product.price*product.count
  }
  
  decreaseCount(product: any) {
    if (product.count > 1) {
      product.count--;
      product.totalCost=product.totalCost-product.price
    }
    if(product.count>5)
      {
        product.totalCost=product.price
      }
  }
  
  callToMart()
  {
    
      const phoneNumber = '1234567890'; // Specify the phone number
      window.location.href = `tel:${phoneNumber}`; // Use the tel: URI scheme to initiate a phone call
    
  }
  
  hideAlert(product:any) {
    this.showAlerts = true;
    product.count=1;
    
    product.totalCost=product.price
  }
  showAlerts = true;
  
    show() {
      this.showAlerts = false;
      
    }
  itemIns:number=0
  noOfItems:number=0;
  itemArray:any=[];
  addItems:boolean=false;
  addingItems(product:any)
  {
    
    if(product.button.buttonText=='Add to Basket')
    {
     
      this.dataTransferService.setsharedArrayOffer(product,product.button.buttonText)
        this.itemArray.push(product)
        this.noOfItems=this.itemArray.length
        this.itemIns++;
        this.addItems=true
        this.dataTransferService.addItemsCount(this.addItems)
        this.fotter.countingCart()
      
  
        this.logInStatus=this.dataTransferService.logInStatus;
        
        
        this.hideLogInAlert()
  
        
       
    }
   
  }
  
  hideLogInAlert()
  {
    if (this.logInStatus===true) {
      // Swal.fire({
      //   title: 'Need to log in first',
      //   icon: 'warning',
      //   showCancelButton: false,
      //   confirmButtonText: 'Log in'
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     this.router.navigate(['src/app/log-in']);
      //   }
      // });
      alert("Need to log in first")
      this.router.navigate(['src/app/log-in']);
      this.logInStatus=false;
      this.dataTransferService.logInStatus=false;
  
    }
       
  }
  public share()
  {
    //this.dataTransferService.setsharedArrayOffer(this.itemArray);
  }
  navToVoice()
  {
    this.router.navigate(['src/app/Voice'])
  }
   searchTerm:any = '';
  
  
  
  navToScearch()
  {
    this.router.navigate(['src/app/scearch'])
  }
    
  navToNotification()
  {
    this.router.navigate(['src/app/notification'])
  }

}
