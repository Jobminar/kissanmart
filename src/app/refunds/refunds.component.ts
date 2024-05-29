import { Component ,OnInit} from '@angular/core';
import { Location } from '@angular/common';

import { DataTransferService } from '../data-transfer.service';
import { OrdersService } from '../orders.service';
import { HttpClient, } from '@angular/common/http';
@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrl: './refunds.component.css'
})
export class RefundsComponent implements OnInit{
  refunds:any[]=[];
  constructor(
    private location: Location,
    private orderService: OrdersService,
    private dataTransferService: DataTransferService,
    private  http:HttpClient
  ) {
   
    
  }

  ngOnInit(): void {
   
    this.gettingItems();
  }

  gettingItems() {
    this.orderService.fetchData().subscribe(
        (response) => {
            this.orderService.formatData(response);
            this.refunds = response.filter((order: { orderStatus: string; }) => order.orderStatus === 'cancel');
            this.refunds.forEach((order: any) => {
                order.responseDateTime = new Date(); // Set current date and time
            });

           
        },
        (error) => {
          
        }
    );
}


  
  

  goToPreviousPage(): void {
    this.location.back();
  }

}
