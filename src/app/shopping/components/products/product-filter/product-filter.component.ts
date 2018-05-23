import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category')category;

  constructor(categoryService:CategoryService) { 
    this.categories$ = categoryService.getAll();
    
  }

  ngOnInit() {
  }

}
