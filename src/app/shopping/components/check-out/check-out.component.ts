import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{

  shipping = {}; 
  cart:ShoppingCart;
  userId: string;
  cartSubscription:Subscription;
  userSubscription:Subscription

  constructor(
              private router:Router,
              private shoppingCartService:ShoppingCartService,
               private orderService:OrderService,
              private authService:AuthService){}

  async ngOnInit(){
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart =>this.cart = cart);
    this.userSubscription =this.authService.user$.subscribe(user =>this.userId = user.uid);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = {
      userId:this.userId,
      datePlaced: new Date().getTime(),
      shipping:this.shipping,
      items:this.cart.items.map(i=> {
        return {
            product:{
              title:i.product.title,
              imageUrl:i.product.imageUrl,
              price:i.product.price
            },
            quantity:i.quantity,
            totalPrice:i.totalPrice
        }
      })
    };
    console.log("order", order);
    if(order.items.length!=0){
      let result =this.orderService.placeOrder(order);
      this.router.navigate(['/order-success', result.key]);
    }
   
  }  

}
