import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SssionStorageService {

 
  userId: string = '';
  email: string = '';
  phoneNumber: string = '';
  userName: string = '';
  userTocken: any;
  currentTime: any;
  constructor(private http: HttpClient, private router: Router) { }

  private isLocalStorageAvailable(): boolean {
    try {
      return !!localStorage;
    } catch (e) {
      return false;
    }
  }

  private getFromLocalStorage(key: string): any {
    if (this.isLocalStorageAvailable()) {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } else {
      return null;
    }
  }

  set(key: string, value: any): void {

    this.currentTime=new Date();
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  get(key: string): any {
    return this.getFromLocalStorage(key);
  }

  remove(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  gettingUserSetails(): Observable<any> {
    const storedUser = this.getFromLocalStorage('userId');
    if (storedUser && storedUser.token) {
      this.userId = storedUser.userId;
      this.userTocken = storedUser.token;
      const api = 'https://kisan-be-odvc.onrender.com/getuser';
      const req = { userId: this.userId };
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json'
        ,'Authorization': `Bearer ${this.userTocken}`
       });
      
      this.http.post(api,req,{headers:headers}).subscribe(
        (response:any)=>{
     
          this.email=response.email;
          this.phoneNumber=response.phoneNumber;
          this.userName=response.userName;
        },
        (error)=>{
          console.log(error);
        }
      )
      return this.http.post(api, req).pipe(
        catchError(error => {
          console.error('Error fetching user details:', error);
          return of(null);
        })
      );
    } else {
      console.error('User details not found in localStorage');
      return of(null);
    }
  }
  logout(): void {
    this.remove('userId');
    this.remove('userTocken');
    
  }
  async autoLogOut()
  {
    const logoutTime = new Date(this.currentTime.getTime() + (12 * 60 * 60 * 1000));
  
    // Calculate the time difference between the logout time and the current time
    const timeDifference = logoutTime.getTime() - this.currentTime.getTime();
    
    // Set a timeout to trigger the logout action after the calculated time difference
    setTimeout(async () => {
      await this.logout();
      this.router.navigate(['src/app/log-in']);
    }, timeDifference);
  }
}
