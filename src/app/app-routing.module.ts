import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

const routes: Routes = [
  /*
   * Makes sure we don't try to show a 404 ou error while single-spa is transitioning between routes
   * https://single-spa.js.org/docs/ecosystem-angular#configure-routes
   */
  { path: 'order', component: OrderComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    /*
     * Should be same as mount in root, but have strange effects when navigate between apps.
     * https://single-spa.js.org/docs/ecosystem-angular#configure-routes
     */
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppRoutingModule { }
