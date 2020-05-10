import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// forms module bo template z formami używamy 
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

import { UserService } from './shared/services/user.service';
import { OrderListComponentComponent } from './Components/Order/Order_List/order-list-component/order-list-component.component';
import { MenuComponentComponent } from './Components/Menu/menu-component/menu-component.component';
//RouterModule: moduł odpowiedzialny za nawigacje generalnie, routes - array który zawiera informacje o ścieżce do każdego modułu
import { RouterModule, Routes } from '@angular/router';
import { UserListComponentComponent } from './Components/User_Components/user-list-component/user-list-component.component';
import { UserDetailComponentComponent } from './Components/User_Components/user-detail-component/user-detail-component.component';
import { UsersEditorComponent } from './Components/User_Components/users-editor/users-editor.component';
import { OrderService } from './shared/services/order.service';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { RegisterUserComponentComponent } from './Components/User_Components/register-user-component/register-user-component.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponentComponent } from './Components/home-component/home-component.component';
import { OrderTemplateComponentComponent } from './Components/OrderTemplate/order-template-component/order-template-component.component';
import { OrderTemplateListComponentComponent } from './Components/OrderTemplate/order-template-list-component/order-template-list-component.component';
import { AuthAdminGuard } from './auth/auth-admin.guard';
import { AuthEmployeeGuard } from './auth/auth-employee.guard';
import { OrderTemplateDetailsComponentComponent } from './Components/OrderTemplate/order-template-details-component/order-template-details-component.component';
import { OrderTemplate } from './shared/order-template.model';
import { OrderDetailsComponentComponent } from './Components/Order/order-details-component/order-details-component.component';

import { UserOdersInfoComponent } from './Components/Order/user-oders-info/user-oders-info.component';
import { OrderTemplateService } from './shared/services/order-template.service';

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
      , { path: 'Order_Template_Detail', component: OrderTemplateDetailsComponentComponent,canActivate: [AuthEmployeeGuard], },
      {path:'Order_List',component: OrderListComponentComponent,children:[
        {
          path:'Order_Details',component:OrderDetailsComponentComponent,
          children:[
            {
              path: 'Order_Template_Detail', component: OrderTemplateDetailsComponentComponent,canActivate: [AuthEmployeeGuard],
            },{
              path:'Order_Order_Template',component:OrderTemplateComponentComponent
            }
          ]
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
  providers: [UserService,OrderTemplateService, OrderService, AuthGuard, AuthAdminGuard, AuthEmployeeGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
