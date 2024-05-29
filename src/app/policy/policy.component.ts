import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css'
})
export class PolicyComponent implements OnInit{
  ngOnInit(): void {
     
  }
  constructor(private location:Location,
              ){}
  goToPreviousPage(): void {
    this.location.back();
  }
  email='kisanmarketinfo@gmail.com'


  showShipment: boolean = false;
  showCancellation: boolean = false;
  showTerms: boolean = false;
  showPrivacy:boolean=false;
  
  toggleSection(section: string): void {
      switch(section) {
          case 'Shipment':
              this.showShipment = !this.showShipment;
              break;
          case 'cancellation':
              this.showCancellation = !this.showCancellation;
              break;
          case 'terms':
              this.showTerms = !this.showTerms;
              break;
          case'privacy':
              this.showPrivacy=!this.showPrivacy;
              break;
          default:
              break;
      }
  }

}
