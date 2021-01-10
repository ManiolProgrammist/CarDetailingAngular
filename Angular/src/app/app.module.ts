import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// forms module bo template z formami używamy 
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

import { OrderTemplateService } from './shared/services/order-template.service';
import { DatePickerComponentComponent } from './Components/Pickers/date-picker-component/date-picker-component.component';
import { HourPickerComponent } from './Components/Pickers/hour-picker/hour-picker.component';
import { PickOrderComponent } from './Components/Pickers/pick-order/pick-order.component';
import { ManageOrderComponent } from './Components/Order/manage-order/manage-order.component';
import { NormalUserOrderListComponent } from './Components/Order/normal-user-order-list/normal-user-order-list.component';
import { EmployeeOrderListComponent } from './Components/Order/employee-order-list/employee-order-list.component';
import { SelectLoginTypeOrderComponent } from './Components/select-login-type-order/select-login-type-order.component';
import { AcceptOrderInfoComponent } from './Components/Order/accept-order-info/accept-order-info.component';
import { TemporaryUserInfoOrderComponent } from './Components/Order/temporary-user-info-order/temporary-user-info-order.component';
import { ImageRightComponent } from './Components/OrderTemplate/TemplateShow/image-right/image-right.component';
import { NgxStripeModule } from 'ngx-stripe';
import { Ng2CompleterModule } from 'ng2-completer';
import { UserPickerComponent } from './Components/User_Components/user-picker/user-picker.component';
import { AccountSettingsComponentComponent } from './Components/account-settings-component/account-settings-component.component';
import { ContactComponent } from './Components/contact/contact.component';

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
    DatePickerComponentComponent,
    HourPickerComponent,
    PickOrderComponent,
    ManageOrderComponent,
    NormalUserOrderListComponent,
    EmployeeOrderListComponent,
    SelectLoginTypeOrderComponent,

    AcceptOrderInfoComponent,
    TemporaryUserInfoOrderComponent,
    ImageRightComponent,
    UserPickerComponent,
    AccountSettingsComponentComponent,
    ContactComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    NgxStripeModule.forRoot('pk_test_51HszhkD9xcu8ECH3qq2PWCmdpB9wWk1incGwq5hpyhxUuY8pVmu5ZbPdl9XETeO2TtnAoZ2s8RzFykhnTFjRJPwM00NeDuznWL'),
    AppRoutingModule,  // forms module importujemy wszędzie gdzie jest ngModule
    FormsModule,
    Ng2CompleterModule,
    RouterModule.forRoot([
      { path: "User_List_Edit", component: UsersEditorComponent, canActivate: [AuthEmployeeGuard] },
      { path: 'Users_editor', component: UsersEditorComponent, canActivate: [AuthEmployeeGuard] },
      { path: '', component: HomeComponentComponent },
      { path: '*', component: HomeComponentComponent },
      { path: 'home', component: HomeComponentComponent },
      { path: 'Register_user', component: RegisterUserComponentComponent },
      { path: 'Order_Template_List', component: OrderTemplateListComponentComponent },
      { path: 'Pick_Order_Template', component: PickOrderComponent },
      { path: 'Order_Template_Detail', component: OrderTemplateDetailsComponentComponent, canActivate: [AuthEmployeeGuard] },
      { path: 'Picked_User_Order_List', component: NormalUserOrderListComponent, canActivate: [AuthEmployeeGuard] },
      { path: 'Contact', component: ContactComponent },
      { path: 'Account', component: AccountSettingsComponentComponent },
      // {
      //   path: 'Order_List', component: OrderListComponentComponent
      // },
      { path: 'User_Orders', component: NormalUserOrderListComponent, canActivate: [AuthGuard] },
      { path: 'All_Orders', component: EmployeeOrderListComponent, canActivate: [AuthEmployeeGuard] },
      { path: 'Order_Details', component: OrderDetailsComponentComponent },
      { path: 'Date_Picker', component: DatePickerComponentComponent },
      { path: 'Hour_Picker', component: HourPickerComponent },
      { path: 'Select_Log_Type', component: SelectLoginTypeOrderComponent },
      { path: 'Temporary_Order_Info', component: TemporaryUserInfoOrderComponent }

      //https://codecraft.tv/courses/angular/routing/nested-routes/
    ]),
    //w konstruktorze w PaymentDetail.service używamy od HttpClientModule HttpClient
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService, OrderTemplateService, OrderService, AuthGuard, AuthAdminGuard, AuthEmployeeGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
