import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// forms module bo template z formami używamy 
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

import { UserService } from './shared/services/user.service';
import { OrderListComponentComponent } from './Order/Order_List/order-list-component/order-list-component.component';
import { MenuComponentComponent } from './Menu/menu-component/menu-component.component';
//RouterModule: moduł odpowiedzialny za nawigacje generalnie, routes - array który zawiera informacje o ścieżce do każdego modułu
import { RouterModule, Routes } from '@angular/router';
import { UserListComponentComponent } from './User_Components/user-list-component/user-list-component.component';
import { UserDetailComponentComponent } from './User_Components/user-detail-component/user-detail-component.component';
import { UsersEditorComponent } from './User_Components/users-editor/users-editor.component';
import { OrderService } from './shared/services/order.service';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterUserComponentComponent } from './User_Components/register-user-component/register-user-component.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponentComponent } from './home-component/home-component.component';
import { OrderTemplateComponentComponent } from './OrderTemplate/order-template-component/order-template-component.component';
import { OrderTemplateListComponentComponent } from './OrderTemplate/order-template-list-component/order-template-list-component.component';
import { AuthAdminGuard } from './auth/auth-admin.guard';
import { AuthEmployeeGuard } from './auth/auth-employee.guard';
import { OrderTemplateDetailsComponentComponent } from './OrderTemplate/order-template-details-component/order-template-details-component.component';
import { OrderTemplate } from './shared/order-template.model';
import { OrderDetailsComponentComponent } from './Order/order-details-component/order-details-component.component';
import { OrderOrderThisComponent } from './Order/order-order-this/order-order-this.component';
import { UserOdersInfoComponent } from './Order/user-oders-info/user-oders-info.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponentComponent,
    UserListComponentComponent,
    UserDetailComponentComponent,
    MenuComponentComponent,

    UsersEditorComponent,
    LoginComponentComponent,
    RegisterUserComponentComponent,
    HomeComponentComponent,
    OrderTemplateComponentComponent,
    OrderTemplateListComponentComponent,
    OrderTemplateDetailsComponentComponent,
    OrderDetailsComponentComponent,
    OrderOrderThisComponent,
    UserOdersInfoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // forms module importujemy wszędzie gdzie jest ngModule
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'User_List', component: UserListComponentComponent, canActivate: [AuthEmployeeGuard],
        children: [{ path: 'User_edit', component: UserDetailComponentComponent },
        { path: 'User_edit/:id', component: UserDetailComponentComponent }]
      },
      { path: 'Users_editor', component: UsersEditorComponent, canActivate: [AuthEmployeeGuard] },
      { path: '', component: HomeComponentComponent },
      { path: 'Register_user', component: RegisterUserComponentComponent },
      {
        path: 'Order_Template_List', component: OrderTemplateListComponentComponent, children: [
          {
            path: 'Order_Template_Detail', component: OrderTemplateDetailsComponentComponent
          },{
            path:'Order_Order_Template',component:OrderTemplateComponentComponent
          }
        ]
      }
      , { path: 'Order_Template_Detail', component: OrderTemplateDetailsComponentComponent },
      {path:'Order_List',component: OrderListComponentComponent,children:[
        {
          path:'Order_Details',component:OrderDetailsComponentComponent
        }
      ]},
      {path:'Order_Details',component:OrderDetailsComponentComponent},
      
      //https://codecraft.tv/courses/angular/routing/nested-routes/
    ]),
    //w konstruktorze w PaymentDetail.service używamy od HttpClientModule HttpClient
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService, OrderService, AuthGuard, AuthAdminGuard, AuthEmployeeGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
