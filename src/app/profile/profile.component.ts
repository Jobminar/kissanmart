import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataTransferService } from '../data-transfer.service';
import { SssionStorageService } from '../sssion-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  name:any="";
  phoneNo:any=0;
  email:string='';
  goToPreviousPage(): void {
    this.location.back();
  }
  Slides:any=[
    {
      title:'Address',
      src:'assets/profile/location.png',
      navigate:'src/app/address'
    },
    {
      title:'Refunds',
      src:'assets/profile/money.png',
      navigate:'src/app/refunds'
    },
    {
      title:'Past Order',
      src:'assets/profile/past.png',
      navigate:'src/app/past-order'
    },
    {
      title:'Store Location',
      src:'assets/profile/location.png',
      navigate:'src/app/office-location'
    },
    {
      title:'About us',
      src:'assets/profile/about (1).png',
      navigate:'src/app/about-us'
    },

    {
      title:'Contact Us',
      src:'assets/profile/help.png',
      navigate:'src/app/help'
    },
    {
      title:'Log Out',
      src:'assets/profile/log out.png',
      navigate:'src/app/log-in'
    }
  ]

  ngOnInit(): void {
     
  }
  constructor(private router:Router,
              private location: Location,
              private dataTransferService:DataTransferService,
              private sessionStroage:SssionStorageService
              ){
               
               
      this.name=this.sessionStroage.userName;
      this.phoneNo=this.sessionStroage.phoneNumber;
      this.email=this.sessionStroage.email
    }
  navTo(slide:any)
  {
    if (slide.navigate=='src/app/log-in') {
      localStorage.removeItem('userId')
      this.router.navigate([slide.navigate])
    } else {
      this.router.navigate([slide.navigate])
    }
   
  }
  edit()
  {
    this.router.navigate(['src/app/edit-profile'])
  }

}
