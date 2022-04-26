import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DeliveryTimeComponent } from './delivery-time/delivery-time.component';
import { FinishPageComponent } from './finish-page/finish-page.component';
import { LocationComponent } from './location/location.component';
import { MainComponent } from './main/main.component';
import { OrderDescriptionComponent } from './order-description/order-description.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderLocationsComponent } from './order-locations/order-locations.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

const routes: Routes = [
 {path:'', component:MainComponent}, 
 {path:'location', component:OrderLocationsComponent},
 {path:'delivery-time', component: DeliveryTimeComponent},
 {path:'payment-method', component:PaymentMethodComponent},
 {path:'order-detail', component:OrderDetailComponent},
 {path:'finish-page', component:FinishPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
