import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { LoginComponent } from './core/components/login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'shared/services/auth.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { UserService } from 'shared/services/user.service';
import { AdminAuthGuard} from './admin/services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { CategoryService } from 'shared/services/category.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { ProductService } from 'shared/services/product.service';
import { ProductFilterComponent } from './shopping/components/products/product-filter/product-filter.component';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartSummaryComponent } from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    LoginComponent ,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', 
        component:ProductsComponent
      },
      {
        path:'products', 
        component:ProductsComponent
      },
      {
        path: 'shopping-cart', 
        component:ShoppingCartComponent
      },
      {
        path:'login', 
        component:LoginComponent
      },
      {
        path:'check-out', 
        component:CheckOutComponent, 
        canActivate:[AuthGuard]
      },
      {
        path:'order-success/:id', 
        component:OrderSuccessComponent, 
        canActivate:[AuthGuard]
      },     
      {
        path:'my/orders', 
        component:MyOrdersComponent, 
        canActivate:[AuthGuard]
      },     
      {
        path:'admin/products/new', 
        component:ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
      {
        path:'admin/products/:id', 
        component:ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
      {
        path:'admin/products', 
        component:AdminProductsComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
      {
        path:'admin/orders', 
        component:AdminOrdersComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      }, 
      {
        path:'**', 
        component:HomeComponent
      }
    ])
  ],
  providers: [AuthService,
              AuthGuard,
              AdminAuthGuard,
              UserService,              
              CategoryService,
              ProductService,
              ShoppingCartService,
              OrderService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
