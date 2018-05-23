import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements  OnInit, OnDestroy{
 
  products: Product[]= [];
  filteredProducts: Product[] = [];
  category: string;
  cart:any;
  subscription:Subscription;

  constructor(productService:ProductService, route:ActivatedRoute, private shoppingCartService:ShoppingCartService) {

      
      productService.getAll().subscribe(products=>{
         this.products = products;

         route.queryParamMap.subscribe(params=>{
            this.category = params.get('category');
            this.filteredProducts = (this.category) ? this.products.filter(p => p.category ===this.category) : this.products;
          });
      });

   }

   async ngOnInit() {
      /*this.subscription = (await this.shoppingCartService.getCart()).valueChanges()
                           .subscribe(cart => this.cart = cart);*/
      this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);

  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
