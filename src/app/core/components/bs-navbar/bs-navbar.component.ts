import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app.user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
 

  appUser: AppUser;
  cart$;

  navbarCollapsed=true;

  constructor(private auth: AuthService, private shoppingCartService:ShoppingCartService) { 
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    

    /*  const cart = this.shoppingCartService.getCart();
      cart.then(
      cart$ => {
      cart$.snapshotChanges().subscribe(cartsub => {
        this.shoppingCartItemCount = 0 ;
        for (const productId in cartsub.payload.val().items) {
        this.shoppingCartItemCount += cartsub.payload.val().items[productId].quantity;
        }
      });
      }
      );*/
}
    logout(){
      this.auth.logout();

    }
}