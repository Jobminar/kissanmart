import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent {
  goToPreviousPage(): void {
    this.location.back();
  }

  formData={
    phoneNumber:'',
    email:''
  }
  constructor (private location: Location,
                )
  {

  }
  submit()
  {

  }

}
