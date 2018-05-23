import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db:AngularFireDatabase, private shoppingCartService:ShoppingCartService) { }

   placeOrder(order){
    let result =this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
   return result;
  }

  getOrder(){
    return this.db.list('/orders');
  }

  getAll(userId){
    return this.db.list('/orders', 
    //Jz7cP3BUWIQbpbDyo5yK3LlCx4T2
    //ref => ref.orderByChild('userId').equalTo('Jz7cP3BUWIQbpbDyo5yK3LlCx4T2')
    //  ref => ref.orderByChild('userId').equalTo('uF9IGtNZF8RTEnKQ3iGlnw8YAsF2')
      ref => ref.orderByChild('userId').equalTo(userId)
    ).valueChanges();
    
  }
  getMyOrders(){
    return this.db.list('/orders').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  /*getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId        
      }
    });
  }*/
}
