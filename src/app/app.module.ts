import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './components/order/order.component';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    RestaurantComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
