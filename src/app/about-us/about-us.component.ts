import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  constructor(private location:Location,
  )
{

}
goToPreviousPage(): void {
this.location.back();
}
}
