import { Component ,ElementRef, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  @ViewChild('printContent') printContent!: ElementRef;

  goToPreviousPage(): void {
    this.location.back();
  }
  userDetailsForm = new FormGroup({
  
    email: new FormControl('', [Validators.required, Validators.email]),
      
  });

  constructor(private httpClient: HttpClient,
              private router:Router,
              private location:Location) {}
  generatedOtp:any='';
  generateRandomNumber() {
    this.generatedOtp = Math.floor(1000 + Math.random() * 9000);
    
  }
  generateEmailContent() {
    
    this.generateRandomNumber();
    const userDetails = this.userDetailsForm.value;
    const message = `Hello,

      You have a new booking from Binge-in:

      Booking details:
      - Email: ${userDetails.email}
      ${this.isEmpty(userDetails) ? "Please update the missing information and confirm the booking." : ""}

      Best regards,
      Binge-in Team`;

          const data = {
            service_id: "service_vn36q2e",
            template_id: "template_6um9rf9",
            user_id: "-Q8_wlFJhIcaHOpjO",
            template_params: {
          
            from: "Binge-in",
            to: userDetails.email,
            message: this.generatedOtp,
            reply_to: userDetails.email,
            Bcc: "jobminarinfo@gmail.com",
            cc: "sameerg1810@gmail.com",
          },
        };

    this.httpClient.post("https://api.emailjs.com/api/v1.0/email/send", data)
      .subscribe((response: any) => {
       
        setTimeout(() => {
          this.sendingApi(this.generatedOtp)
        }, 1000);
      }, (error: any) => {
        // console.error("Error sending email:", error);
        // alert("Error sending email. Please try again later.");
        this.sendingApi(this.generatedOtp)
      });
  }

  isEmpty(object: any) {
    return Object.keys(object).length === 0;
  }

  handlePrint() {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(this.printContent.nativeElement.innerHTML);
      printWindow.document.close();
      printWindow.print();
    }
  }

  

  handleShareEmail() {
    this.generateEmailContent();
  }

  customLabels: { [key: string]: string } = {
    theaterType: "Theatre Type",
    name: "Customer Name",
    contact: "Contact Number",
    date: "Booking Date",
    time: "Booking Time",
    numOfPeople: "Number of People",
    addons: "Add-ons",
    CGST: "CGST",
    SGST: "SGST",
    generatedBill: "TOTAL AMOUNT",
    dueAmount: "Due Amount",
  }; 
  
  showOtp:boolean=false;
  hideButton:boolean=true;
  details()
  {
    
    if (this.userDetailsForm.get('email')?.value) {
     
      this. generateEmailContent();
      this.showOtp=true;
      this.hideButton=false
     
    }
    
  }
  sendingApi(otp:any)
  {
    
    const apiUrl='https://kisan-be-odvc.onrender.com/otp/save';
    const requstBody={
      email:this.userDetailsForm.value.email,
      otp:otp

    }

    this.httpClient.post(apiUrl,requstBody).subscribe(
      (response) => {
          
            this.fetchData();
         }, (error: any) => {
          
             alert("Error sending email. Please try again later.");
      });
    
  }

  otpGetting:any='';
  fetchData() {
   
    const email=this.userDetailsForm.value.email
    this.httpClient.get<any>(`https://kisan-be-odvc.onrender.com/otp/${email}`).subscribe(

        (response) => {
          
         
          this.otpGetting=response.otp
         
          
        },
        (error) => {
         
        
        }
      );
  }

  otp: number = 0; 
  newPassword: string = ''; 
  setNewPassword()
  {
   
    if (this.otpGetting===this.otp) {

      this.updatingPassword()
    } else {
      alert("enter the valid otp")
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Invalid OTP',
      //   text: 'The entered OTP is invalid. Please try again.'
      // });
    }
    
  }
  updatingPassword()
  {
    const apiUrl='https://kisan-be-odvc.onrender.com/update-password';

    const requestBody={
      email:this.userDetailsForm.value.email,
      newPassword:this.newPassword
    }

    this.httpClient.put(apiUrl,requestBody).subscribe(
      (response) => {
     
        this.fetchData();
        
        alert("password reset successfully!")
        // Swal.fire({
        //   icon: 'success',
        //   title: 'password reset successfully!',
        //   showConfirmButton: false,
        //   timer: 1500 
        // });
      this.router.navigate(['src/app/log-in'])
     }, (error: any) => {
      
         alert(error);
  });
  }

  togglePasswordVisibility(event: any) {
    const passwordInput = document.getElementById('newPassword') as HTMLInputElement;
    passwordInput.type = event.target.checked ? 'text' : 'password';
  }

}
