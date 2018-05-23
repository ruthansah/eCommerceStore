import { Component, OnInit, OnDestroy  } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app.user';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {


  orders:any;
  subscription:Subscription;
  authSubscription:Subscription;
  products:any[]
  cartItem:any[] = [];
  appUser: AppUser;

  constructor( private authService: AuthService, private orderService:OrderService) {

  }

   ngOnInit() {
    this.authSubscription =this.authService.appUser$.subscribe(appUser => {
      this.appUser = appUser,
      this.orderService.getAll(appUser.uid).subscribe(orders=> {
        this.orders=orders
             
      })
    });
  }


  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
    //this.authSubscription.unsubscribe();
  }

}
