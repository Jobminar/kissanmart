import { Component,OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-fotter',
  templateUrl: './fotter.component.html',
  styleUrl: './fotter.component.css'
})
export class FotterComponent implements OnInit{
  dumpyArray: any[] = [];
  userId: any = '';
  itemsInCart: any;
  countOfFruits: number = 0;

  constructor(
    private router: Router,
    private sharedDataService: DataTransferService,
    private dataTransferService: DataTransferService,
    private cart: CartService,
    private cdr: ChangeDetectorRef
  ) {
    this.userId = this.dataTransferService.userId;
    this.dumpyArray = this.cart.cartResponse; // Assuming cartResponse is not an Observable
    this.countingCart();
     this.fetcingCartItem(this.userId);
  }

  ngOnInit(): void {
    this.userId = this.dataTransferService.userId;
    
    this.dumpyArray = this.cart.cartResponse; // Assuming cartResponse is not an Observable
    this.countingCart();
    
  }
  refreshFlag: boolean = false;
  toggleRefreshFlag() {
    this.refreshFlag = !this.refreshFlag;
  }
fetcingCartItem(user:any)
{
  
}
countingCart() {
  

    setTimeout(() => {
      this.itemsInCart = this.cart.cartResponse.length; // Assuming cartResponse is an array
   
    this.fetcingCartItem(this.userId);
    this.cdr.detectChanges();
    }, 4000); 
  }

  hideLogInAlert() {
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
    alert("Need to log in first");
    this.router.navigate(['src/app/log-in']);
  }

  navToHome() {
    this.router.navigate(['src/app/home.html']);
  }

  navToCart() {
    if (this.userId === null) {
      this.hideLogInAlert();
    } else {
      this.dataTransferService.gettingItems();
      this.router.navigate(['src/app/my-cart']);
    }
  }

  navToProfile() {
    if (this.userId === null) {
      this.hideLogInAlert();
    } else {
      this.router.navigate(['src/app/profile']);
    }
  }

  navtoNotification() {
    this.router.navigate(['src/app/policy']);
  }

  navToOrders() {
    if (this.userId === null) {
      this.hideLogInAlert();
    } else {
      this.router.navigate(['orders']);
    }
  }
  countingCartVegetables(num: number) {
  
}

}
