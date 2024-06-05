import { Component ,OnInit} from '@angular/core';
import {   ViewChild} from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FotterComponent } from '../fotter/fotter.component';
import { FruitsService } from '../fruits.service';
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-fresh-fruits',
  templateUrl: './fresh-fruits.component.html',
  styleUrl: './fresh-fruits.component.css'
})
export class FreshFruitsComponent implements OnInit{
  @ViewChild('fotter') fotter!: FotterComponent;

  @ViewChild('loading')loading!:LoadingComponent
  isLoading:boolean=false;
  logInStatus:boolean=false;
  inventoryData: any;
  scearch:boolean=false;
  goToPreviousPage(): void {
    this.location.back();
  }
  startSearch(){
    this.scearch = !this.scearch;

  }
  ngOnInit(): void {
    // this.fotter.countingCart()
  }
  constructor(private sharedDataService:DataTransferService,
              private location: Location,
              private router:Router,
              private fruits:FruitsService,
              
    ){
      
     this.isLoading=true;
      this.fruits.fetchData().subscribe(data => {
     
        this.fruits.formatData(data);
        this.fruits.assigningToCat();
        this.isLoading=false;
        this.searchProducts()
        this.assignToProducts()
      });
   
      
    
    if (this.categories.length===0) {
      this.assignToProducts()
    }
    }
  

 categories:any[]=[]
 
  productItems:any[]=[]
  products:any[]=this.fruits.categories[0]?.products||[];
  dummyCat=this.fruits.categories
  assignToProducts() {
  
    if (this.categories.length === 0) {
      this.categories = this.fruits.categories;
    } 
   
  }
  
  
  navigateTo(category:any) {
   this.productItems=category.products
  }
 

  searchTerm:any = '';
   
  searchProducts() {
   
    const filteredProducts = this.categories
  .filter(category => category.category === 'freshFruits') // Filter only the category named 'fruits'
  .flatMap(category => category.products) // Flatten the array of products
  .filter(product => 
    product && 
    product.itemname && 
    product.itemname.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filter products by item name
  );


    this.productItems=filteredProducts
    
    }
  
   
  navigation()
  {
    this.router.navigate(['src/app/fresh-vegetables.html'])
  }
  
  
  

  buttonColor: string = '#00853E'
  originalColor:string='#FF2400'
  buttonText:string='Add to Basket'
  originalText='Remove'
  changeColor(product: any) {
    const button = product.button;
    button.buttonColor = button.buttonColor === button.originalColor ? '#00853E' : '#00853E';
    button.buttonText = button.buttonText === button.originalText ? 'Add to Basket' : 'Add to Basket';
    this.fruits.productsItems=this.productItems
  this.fruits.updateButtonState(button.buttonColor, button.buttonText,product);
    this.fotter.countingCart()
  }
  

  //assign to fruits
 
  
  temp:boolean=true;
  increaseCount(product: any) {
    
    product.count++;
    product.totalCost=product.price*product.count
  }
  largerQuantity(product:any)
{
  // alert("hhhh")
}
  decreaseCount(product: any) {
    if (product.count > 1) {
      product.count--;
      product.price=product.price-120
    }
    if(product.count>5)
    {
      product.totalCost=product.price
    }
  }
  hideAlert(product:any) {
    this.showAlert=true;
    
    product.count=1;
    product.totalCost=product.price
  }
  showAlert = true;

  show() {
    this.showAlert =false; 
  }

 

  itemsin:number=0;
  itemArray:any=[];
  addItems:boolean=false;
  addingItems(product:any)
  {
    
    if(product.button.buttonText==='Add to Basket')
    {
     
      this.sharedDataService.setSharedArray(product,product.button.buttonText)
      this.itemArray.push(product)
      this.itemsin++
      this.addItems=true;
      this.sharedDataService.addItemsCount(this.addItems)
     
      this.logInStatus=this.sharedDataService.logInStatus;
      
     
      this.hideLogInAlert()
      this.fotter.countingCart()
     
    }
   
  }
  callToMart()
  {
    
      const phoneNumber = '1234567890'; // Specify the phone number
      window.location.href = `tel:${phoneNumber}`; // Use the tel: URI scheme to initiate a phone call
    
  }
  hideLogInAlert()
  {
    if (this.logInStatus===true) {
      // Swal.fire({
      //   title: 'Need to log in first',
      //   icon: 'warning',
      //   confirmButtonText: 'OK'
      // }).then(() => {
      //   this.router.navigate(['src/app/log-in']);
      // });
      alert("Need to log in first") 
      this.router.navigate(['src/app/log-in']);
      this.logInStatus=false;
      this.sharedDataService.logInStatus=false;
  
    }
      
  }
  public share()
  {
    //this.sharedDataService.setSharedArray(this.itemArray);
  }

}
