import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise <Observable<ShoppingCart> > {
    let cartId = await this.getOrCreateCartId();
   // const items = {};
      return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges().map(action => {
      const key = action.key;
      const items = action.payload.val().items || {};
      
      return new ShoppingCart(key, items);
      });    
    }

    async addToCart(product:Product){
      let cartId = await this.getOrCreateCartId();
      let item$ = this.getItem(cartId, product.key);
      item$.snapshotChanges().take(1).subscribe( item =>{
        //item$.update({product: product, quantity:(item.payload.val().quantity|| 0) +1});
        if(item.payload.exists()){
         item$.update({quantity: item.payload.val().quantity + 1});
       }
       else{
         item$.update({product: product, quantity:1});
       }
      });
    }
 
     async removeFromCart(product:Product){
       this.updateItemQuantity(product, -1);
     }

     async clearCart(){
       let cartId= await this.getOrCreateCartId();
       this.db.object('/shopping-carts/' + cartId + '/items').remove();
      
     }
 /* async getCart(){
     let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }*/



  private getItem(cartId:string, productId:string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  /*private getOrCreateCart(){
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      this.create().then(result=>{
        localStorage.setItem('cartId', result.key);
        return this.getCart(result.key);
      });
    }else{
      return this.getCart(cartId);
    }
  }*/

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId){
      return cartId;
    }
    else{
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }

 /* async addToCart(product:Product){
    this.updateItemQuantity(product, 1);
  }*/

   /*async addToCart(product: Product){
      let cartId = await this.getOrCreateCartId();
      let item$ = this.getItem(cartId, product.key);
      item$.snapshotChanges().take(1).subscribe( item =>{
        if(item.payload.exists()){
          item$.update({quantity: item.payload.val().quantity + 1});
        }
        else{
          item$.set({product:{
              title:product.title,
              price:product.price,
              category:product.category,
              imageUrl: product.imageUrl
          }, quantity:1});
        }
      });
   }*/



    private async updateItemQuantity(product:Product, change:number){
      let cartId = await this.getOrCreateCartId();
      let item$ = this.getItem(cartId, product.key);
      item$.snapshotChanges().take(1).subscribe( item =>{
        let quant = item.payload.val().quantity + change;
        if(quant ===0) item$.remove();
        else{
        if(item.payload.exists()){
          item$.update({quantity: quant});
        }
         else{
            item$.set({product:{
              title:product.title,
              price:product.price,
              category:product.category,
              imageUrl: product.imageUrl
          }, quantity:1});
        }
      }
      });
    }
}
