import { Component, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SssionStorageService } from '../sssion-storage.service';
import { LoadingComponent } from '../loading/loading.component';
import { FotterComponent } from '../fotter/fotter.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  @ViewChild('loading')loading!:LoadingComponent

  goToPreviousPage(): void {
    this.location.back();
  }
  phoneno: any = "";
  password: any = "";
  loginForm: FormGroup;
  status: boolean = false;
  isLoading: boolean = false;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private sessionStorageService:SssionStorageService,
    private location:Location
  ) {
    this.loginForm = this.fb.group({
      phoneno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', Validators.required]
    });
  }

  get phoneNoControl() {
    return this.loginForm.get('phoneno');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  makeApiRequest() {
    // const apiUrl = 'https://kisan-be-odvc.onrender.com/login';
    const apiUrl = 'https://kisan-be-odvc.onrender.com/login';
    this.isLoading = true;
   
    const requestBody = {
      phoneNumber: this.loginForm.value.phoneno,
      password: this.loginForm.value.password
    };

    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
     
    });

    // Swal.fire({
    //   title: 'Loading...',
    //   allowOutsideClick: false, 
    //   didOpen: () => {
    //     Swal.showLoading(null);
    //   }
    // });
    
    this.http.post(apiUrl, requestBody, { headers }).subscribe(
      (response) => {
        
      
        this.handleLoginResponse(response);
        // Swal.close();
        this.isLoading = false;
      },
      (error) => {
        // Handle errors
       
        this.status=true
        this.isLoading = false;
        // Swal.close();
        
        
      }
    );
  }
  
  logInStatus:boolean=false
  details() {
    
    this.makeApiRequest();
    
  }
  handleLoginResponse(response: any): void {
    if (response) {
      
      this.logInStatus=true;
      this.status=false
      this.router.navigate(['src/app/home.html']);
      this.sessionStorageService.set('userId', response);
      // this.sessionStorageService.set('username', response.username);
    } else {
      // Handle unsuccessful login (optional)
      
      this.status=true
      // setTimeout(() => {
      //   this.status=false
      // }, 5000);
    }
    // setTimeout(() => {
    //   this.status=false
    // }, 5000);
  }
  
  navTosignUpMain()
  {
 
  
  this.router.navigate(['src/app/sign-up-main']);
  }
  
  navToProfile() {
    
    this.router.navigate(['src/app/sign-up-main']);
    
  }
  navToForgot()
  {
    this.router.navigate(['src/app/forgot']);
  }
  showPassword: any = 'show';
  togglePasswordVisibility(event: any) {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    this.showPassword= this.showPassword == 'show'? 'hide' : 'show';
  }

}
