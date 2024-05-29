import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DataTransferService } from '../data-transfer.service';
import { io, Socket } from 'socket.io-client'; // Import Socket type from socket.io-client
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  goToPreviousPage(): void {
    this.location.back();
  }
  socket: Socket;
  successMessage:any='';
  notifications: any;
  userId:any='';
  constructor(private location: Location,
                private http:HttpClient,
                private dataTransferService:DataTransferService) {
                  this.userId = this.dataTransferService.userId;
    this.socket = io('https://server.thekisanmarket.com'); // Replace with your server URL

    this.socket.on('connect', () => {
      // console.log('Connected to Socket.IO');
      this.socket.emit('joinRoom', );
      
    });

    this.socket.on('disconnect', () => {
      // console.log('Disconnected from Socket.IO');
    });

    this.socket.on('receiveSuccessMessage', (message: any) => {
      // console.log('Received success message:', message);
      
      this.sendingMessage(message.userId, message.message)
    });
   
    this.fetchMessageFromBackend(this.userId);
  }
  
  sendingMessage(userId: string, messageText: string): void {
    const message = {
      userId:userId,
      message: messageText,
    };
  
    const apiurl = 'https://server.thekisanmarket.com/storemessage';
  
    this.http.post(apiurl, message).subscribe(
      (response) => {
        // console.log('Message posted successfully', response);
       
      },
      (error) => {
        // console.log('Error posting message', error);
      }
    );
  }

  fetchMessageFromBackend(userId: string): void {
    const apiurl = 'https://server.thekisanmarket.com/getmessagebyuserId';
    
    // Define headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <your-auth-token>'
    });
  
   
    const body = {
      userId: userId
    };
  
   
    this.http.post(apiurl, body, { headers: headers }).subscribe(
      (response) => {
        // console.log('Message fetched successfully', response);
       
       
        if (Array.isArray(response)) {
         
          this.notifications = response.filter((item: { userId: any }) => item.userId == this.userId)
                                    .map((item: { message: any }) => item.message);
        } else {
          
          // console.error('Response is not an array:', response);
        }
       
      },
      (error) => {
        console.log('Error fetching message', error);
      }
    );
  }
  clearMessage()
  {
    const apiurl = 'https://server.thekisanmarket.com/delete-messages';
     
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <your-auth-token>'
      });
    
     
      const body = {
        userId: this.userId
      };
    
      
      this.http.post(apiurl, body, { headers: headers }).subscribe(
        (response) => {
          // console.log('Message deleted successfully', response);
          
         this.notifications=[]
        },
        (error) => {
          // console.log('Error fetching message', error);
        }
      );
    
    
  }

}
