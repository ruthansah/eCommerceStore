import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/take';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  productId;
  product ={};
  //product = { title: "", price: 0, category: "", imageUrl: "" } as Product;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router)
{
this.categories$ = categoryService.getAll();
this.productId = route.snapshot.paramMap.get('id');

if(this.productId) {
  this.product = {};
this.productService.get(this.productId).subscribe(p => this.product = p);
}
}
 /* constructor(
        private router:Router,
        private route: ActivatedRoute, 
        private categoryService: CategoryService, 
        private productService: ProductService
      ) 
      {
        this.categories$ =  categoryService.getAll();
        let id = this.route.snapshot.paramMap.get('id');
        if(id){
        //  this.productService.get(this.id).take(1).subscribe(p=>this.product=p)
          this.productService.get(id).subscribe(product => this.product = product);
        
        }
      }*/

  ngOnInit() {
  }

  save(product){
    if(this.productId){
      this.productService.update(this.productId, product);
    }
    else{
      this.productService.create(product);
    }  
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm('are you sure you want to delete this product?')){
      this.productService.delete(this.productId);
      this.router.navigate(['/admin/products']);
    }
    else{
      return;
   }
  }

}
