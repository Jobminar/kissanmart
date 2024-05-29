import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-helps',
  templateUrl: './helps.component.html',
  styleUrl: './helps.component.css'
})
export class HelpsComponent {
  ngOnInit(): void {

  }
  constructor(private location:Location,
              )
  {

  }
  goToPreviousPage(): void {
    this.location.back();
  }

  email:any='Kisanmarkethyd@gmail.com';
  number:number= +916301086714

}
