import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddressComponent } from './address/address.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EditComponent } from './edit/edit.component';
import { FotterComponent } from './fotter/fotter.component';
import { ForgotComponent } from './forgot/forgot.component';
import { FreshVegetablesComponent } from './fresh-vegetables/fresh-vegetables.component';
import { FreshFruitsComponent } from './fresh-fruits/fresh-fruits.component';
import { HomeComponent } from './home/home.component';
import { HelpsComponent } from './helps/helps.component';
import { LogInComponent } from './log-in/log-in.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { NotificationComponent } from './notification/notification.component';
import { OfficeLocationComponent } from './office-location/office-location.component';
import { OrdersComponent } from './orders/orders.component';
import { PastOrderComponent } from './past-order/past-order.component';
import { PaymentComponent } from './payment/payment.component';
import { PolicyComponent } from './policy/policy.component';
import { ProfileComponent } from './profile/profile.component';
import { RefundsComponent } from './refunds/refunds.component';
import { ScearchComponent } from './scearch/scearch.component';
import { SignUpMainComponent } from './sign-up-main/sign-up-main.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoadingComponent } from './loading/loading.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    AddressComponent,
    EditprofileComponent,
    EditComponent,
    FotterComponent,
    ForgotComponent,
    FreshVegetablesComponent,
    FreshFruitsComponent,
    HomeComponent,
    HelpsComponent,
    LogInComponent,
    MyCartComponent,
    NewAddressComponent,
    NotificationComponent,
    OfficeLocationComponent,
    OrdersComponent,
    PastOrderComponent,
    PaymentComponent,
    PolicyComponent,
    ProfileComponent,
    RefundsComponent,
    ScearchComponent,
    SignUpMainComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule ,
    GoogleMapsModule,
    MatProgressSpinnerModule,
   
    BrowserAnimationsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
