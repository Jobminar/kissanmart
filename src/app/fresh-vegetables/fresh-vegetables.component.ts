import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';
import { Location } from '@angular/common';
import { FotterComponent } from '../fotter/fotter.component';
import { VegetablesService } from '../vegetables.service';
// import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-fresh-vegetables',
  templateUrl: './fresh-vegetables.component.html',
  styleUrl: './fresh-vegetables.component.css'
})
export class FreshVegetablesComponent implements OnInit{


  // @ViewChild('loading')loading!:LoadingComponent
  isLoading:boolean=false;
  logInStatus:boolean=false;
  inventoryData: any;
  scearch:boolean=false;
  default:any=[];
  startSearch(){
    this.scearch = !this.scearch;

  }
  ngOnInit(): void {
    this.byDefultItems()
   this.isLoading=true;
    this.vegetablesService.fetchData().subscribe(data => {
    
      this.vegetablesService.formatData(data);
      this.vegetablesService.assigningToCat();
      this.isLoading=false
    });
    this.vegetablesService.fetchAdditionals().subscribe(
      data=>{
       
        this.vegetablesService.formatData(data);
        this.vegetablesService.assigningToCat();
      }
    )

    this.vegetablesService.fetchLeafyVegetables().subscribe(
      data=>{
       
        this.vegetablesService.formatData(data);
        this.vegetablesService.assigningToCat();
      }
    )
    // this.default()
    // this.vegetablesService.categories.forEach(item=>console.log(item))
  }
    byDefultItems()
  {
    setTimeout(()=>{
    console.log( this.vegetablesService.categories);
    for (let index = 1; index < this.vegetablesService.categories.length; index++) {
      const element = this.vegetablesService.categories[index];
      
     console.log("inside loop");
    }
    const freshVegetables = this.vegetablesService.categories.
    filter(item => item.category=== 'freshVegetables');
    console.log(freshVegetables);
    console.log(freshVegetables[0].products);
    this.productItems=freshVegetables[0].products
  },1000)
  }
  constructor(private router: Router,
              private sharedDataService:DataTransferService,
              private location: Location,
              private vegetablesService:VegetablesService,
        ) { 
     
    }
  @ViewChild('fotter') fotter!: FotterComponent;
  goToPreviousPage(): void {
    this.location.back();
  }

term:any;
categories=this.vegetablesService.categories

productItems:any[]=[]
navigateToFreshFruits(category:any) {
  this.productItems=category.products
}


searchTerm:any = '';
cat:any=""

  filterProducts(): void {
    const filteredProducts = this.categories
  .filter(category => category.category === 'freshVegetables'|| category.category==='additionals'|| category.category==='leafyVegetables') // Filter only the category named 'fruits'
  .flatMap(category => category.products) // Flatten the array of products
  .filter(product => 
    product && 
    product.itemname && 
    product.itemname.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filter products by item name
  );
  this.productItems=filteredProducts
 
}


buttonColor: string = '#00853E';
originalColor:string='#FF2400';
buttonText:string='Add to Basket';
originalText='Remove';
changeColor(product: any) {
  const button = product.button;
  button.buttonColor = button.buttonColor === button.originalColor ? '#00853E' :'#00853E';
  button.buttonText = button.buttonText === button.originalText ? 'Add to Basket' : 'Add to Basket';
  this.fotter.countingCartVegetables( this.itemIns);
  const index=product
  this.vegetablesService.productsItems=this.productItems
  this.vegetablesService.updateButtonState(button.buttonColor, button.buttonText,index);
  // this.itemsInCart=this.sharedDataService.totalItems
}
cost:any=0

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
hideAlert(product:any) {
  this.showAlert = true;
  product.count=1;
  
  product.totalCost=product.price
}




showAlert = true;

  show() {
    this.showAlert = false;
    
  }

 

  itemIns:number=0
  noOfItems:number=0;
  itemArray:any=[];
  addItemss:boolean=false;
  addingItems(product:any)
  {
    
    if(product.button.buttonText=='Add to Basket')
    {
     
      
        this.itemArray.push(product)
        this.sharedDataService.setSharedArrayVegetable(product,product.button.buttonText)
        this.noOfItems=this.itemArray.length
        
        this.addItemss=true;
        this.sharedDataService.addItemsCount(this.addItemss)
       
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
      alert('Need to log in first')
      this.router.navigate(['src/app/log-in']);
      this.logInStatus=false;
      this.sharedDataService.logInStatus=false;
  
    }
       
  }
  
  public share()
  {
   // this.sharedDataService.setSharedArrayVegetable(this.itemArray,this.noOfItems);
  }

}
