import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FreshFruitsComponent } from './fresh-fruits/fresh-fruits.component';
import { LogInComponent } from './log-in/log-in.component';
import { FreshVegetablesComponent } from './fresh-vegetables/fresh-vegetables.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { SignUpMainComponent } from './sign-up-main/sign-up-main.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { RefundsComponent } from './refunds/refunds.component';
import { PastOrderComponent } from './past-order/past-order.component';
import { NotificationComponent } from './notification/notification.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EditComponent } from './edit/edit.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HelpsComponent } from './helps/helps.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { OfficeLocationComponent } from './office-location/office-location.component';
import { OrdersComponent } from './orders/orders.component';
import { PolicyComponent } from './policy/policy.component';
import { ScearchComponent } from './scearch/scearch.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'src/app/fresh-fruits.html', component: FreshFruitsComponent },
  { path: '', component: HomeComponent },
  { path: 'src/app/fresh-vegetables.html', component:FreshVegetablesComponent },
  {path:'src/app/home.html',component:HomeComponent},
  {path: 'src/app/my-cart',component:MyCartComponent},
  {path:'src/app/log-in',component:LogInComponent},
  {path:'src/app/sign-up-main',component:SignUpMainComponent},
  {path:'src/app/sign-up',component:SignUpMainComponent},
  {path:'src/app/profile',component:ProfileComponent},
  {path:'src/app/address',component:AddressComponent},
  {path: 'src/app/refunds',component:RefundsComponent},
  {path:'src/app/past-order',component: PastOrderComponent},
  {path:'src/app/office-location',component: OfficeLocationComponent },
  {path: 'src/app/notification',component:NotificationComponent},
  {path:'orders',component:OrdersComponent},
  // {path :'src/app/payment',component:PaymentComponent},
  {path: 'src/app/new-address',component:NewAddressComponent },
  // {path:'src/app/leafy-vegetables',component:LeafyVegetablesComponent},
  // {path :'src/app/orderconfirm',component:OrderconfirmComponent},
  {path :'src/app/edit',component:EditComponent},
  {path:'src/app/edit-profile',component:EditprofileComponent},

  {path:'src/app/policy',component:PolicyComponent},
  {path:'src/app/scearch',component:ScearchComponent},
  {path:'src/app/help',component:HelpsComponent},
  {path:'src/app/about-us',component:AboutUsComponent},
  {path:'src/app/forgot',component:ForgotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
