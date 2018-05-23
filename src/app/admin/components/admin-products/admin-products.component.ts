import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products:Product[];
  filteredProducts: any[];
  subcription:Subscription;

  constructor(private productService: ProductService) {
    this.subcription = this.productService.getAll().subscribe(products=> this.filteredProducts =this.products=products);
   }

   filter(query:string){
      console.log(query);
      this.filteredProducts = (query) ?
        this.products.filter(p =>p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
   }
  ngOnInit() {
  }
  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

}
