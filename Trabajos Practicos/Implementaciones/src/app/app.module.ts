import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationComponent } from './location/location.component';
import { FormBuilder } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDescriptionComponent } from './order-description/order-description.component';
import { DeliveryTimeComponent } from './delivery-time/delivery-time.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderLocationsComponent } from './order-locations/order-locations.component';
import { FinishPageComponent } from './finish-page/finish-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    MainComponent,
    PaymentMethodComponent,
    OrderDetailComponent,
    OrderDescriptionComponent,
    DeliveryTimeComponent,
    OrderLocationsComponent,
    FinishPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
