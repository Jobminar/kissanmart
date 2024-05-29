import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTransferService } from '../data-transfer.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-sign-up-main',
  templateUrl: './sign-up-main.component.html',
  styleUrl: './sign-up-main.component.css'
})
export class SignUpMainComponent {

  @ViewChild('loading')loading!:LoadingComponent
  isLoading:boolean=false
  goToPreviousPage(): void {
    this.location.back();
  }

  userName:any="";
  email:string="";
  phoneno: any = "";
  password: any = "";
  loginForm: FormGroup;
  status: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private routers:Router,
    private dataSharedservice:DataTransferService,
    private location:Location
  ) {
    
    this.loginForm = this.fb.group({
      userName :['',[Validators.required]],
      email:['',[Validators.required]],
      phoneno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ],
      Confirmpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ]

    });
   
  }
  formValidating()
  {
    
  }
  get userNameControl()
  {
    return this.loginForm.get('userName')
  }
  get emailControl() {
   
    return this.loginForm.get('email');
  }
  get phoneNoControl() {
   
    return this.loginForm.get('phoneno');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
  
 
  check()
  {
   
  }
  PasswordStatuss:boolean=false;
  details() {
    this.isLoading=true;
    this.status = false;
    this.loginForm.controls['userName'].updateValueAndValidity();
    this.loginForm.controls['email'].updateValueAndValidity();
    this.loginForm.controls['phoneno'].updateValueAndValidity();
    this.loginForm.controls['password'].updateValueAndValidity();
    this.loginForm.controls['Confirmpassword'].updateValueAndValidity();
    
    if (!this.loginForm.controls['password'].valid) {
     
      this.PasswordStatuss=true
     
    }
    
    else{
      this.PasswordStatuss=false
    }
    if (this.loginForm.valid) {
      
      this.status = false;
      this.dataSharedservice.setSignUpDetails(this.loginForm.value.phoneno,
        this.loginForm.value.password,this.loginForm.value.userName,this.loginForm.value.email)
      // this.routers.navigate(['src/app/sign-up'])
      this.verify()
    }
    else {
      this.status = true;
    }
 
  }
  statuss:any;
  passwordInput:any;
  confirmPasword:any;
  FinalPassword:any;
  verify()
  {
   this .passwordInput=this.loginForm.value.password
   this.confirmPasword=this.loginForm.value.Confirmpassword 
  
   if(this.passwordInput==this.confirmPasword)
   {
    this.FinalPassword=this.confirmPasword
    this.statuss=false
   
    this.makeApiRequest();
    this.routers.navigate(['src/app/log-in'])
   }
   else{
    this.statuss=true
   }
  }

  makeApiRequest() {
    // Swal.fire({
    //   title: 'Loading...',
    //   text: 'Please wait...',
    //   allowOutsideClick: false, // Prevent closing the alert by clicking outside
    //   allowEscapeKey: false, // Prevent closing the alert by pressing the escape key
    //   showConfirmButton: false, // Show the confirm button
    //   willOpen: () => {
    //     // Use Swal.showLoading() to replace the confirm button with a loading spinner
    //     Swal.showLoading(Swal.getDenyButton());
    //   },
    // });
    this.isLoading=true;
    const apiUrl = 'https://kisan-be-odvc.onrender.com/signup';

    
    const requestBody = {
     
      userName:this.loginForm.value.userName,
      phoneNumber:this.loginForm.value.phoneno,
      password:this.FinalPassword,
      email:this.loginForm.value.email
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    
    this.http.post(apiUrl, requestBody, { headers }).subscribe(
      (response) => {
        // Swal.close();
       
       
        this.scuessfulMsg()
       
      
      },
      (error) => {
        // Swal.close();  
        this.isLoading=false;
        
        if (error.error.error=="phoneNumber is already registered") {
         
          // Swal.fire("error","user already exits with this phone number","error")
          alert("user already exits with this phone number")
        }
      }
    );
  }

  scuessfulMsg()
  {
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Success',
    //   text: 'SignUp sucessful',
    //   timer: 2000, // Display the alert for 2 seconds
    //   showConfirmButton: false, // Hide the confirm button
    //   timerProgressBar: true // Show the progress bar for the timer
    // });
    alert("SignUp sucessful")
    this.isLoading=false;
    this.routers.navigate(['src/app/log-in'])
  }
 
  
  showText:any='show'
  confirmText:any='show'
  togglePasswordVisibility(event: any) {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    this.showText = this.showText=== 'show' ? 'hide' : 'show';
  }

  toggleConfirmPasswordVisibility(event: any) {
    const passwordInput = document.getElementById('Confirmpassword') as HTMLInputElement;
    passwordInput.type =  passwordInput.type=== 'password'? 'text' : 'password';
    this.confirmText = this.confirmText=== 'show' ? 'hide' : 'show';
  }

}
