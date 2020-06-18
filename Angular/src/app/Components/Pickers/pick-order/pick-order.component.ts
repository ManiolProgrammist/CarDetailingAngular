import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderTemplate } from 'src/app/shared/order-template.model';
import { Router } from '@angular/router';
import { OrderTemplateService } from 'src/app/shared/services/order-template.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRights } from 'src/app/shared/Enums/UserRightsEnum';
import { User } from 'src/app/shared/UserModels/user.model';
import { Result } from 'src/app/shared/result.model';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-pick-order',
  templateUrl: './pick-order.component.html',
  styleUrls: ['./pick-order.component.css']
})
export class PickOrderComponent implements OnInit, AfterViewInit {

 

  constructor(public orderTemplateService: OrderTemplateService, public userService: UserService, public router: Router,private orderService:OrderService) { 
   

   
   
  }

  private Reset(){
    this.showInfoFlag=false;
    this.pickFromDateFlag=false;
    this.pickedOrder=new Order();
    this.pickedOrder.IsOrderCompleted=false;
    this.pickedOrder.IsOrderStarted=false;
    this.pickedOrder.IsPaid=false;
    // this.pickedUserToOrder=new User();
    this.PickedDate=null;
    //gdy jest zalogowany
    if(this.userService.IsLoggedIn){
    this.pickedOrder.CreateOrderUserId=this.userService.LoggedUser.UserId;
    //gdy jest zalogowany zwykly user a nie employee/admin
    if(!this.userService.shouldIShownItem(UserRights.EmployeeUser)){
      this.pickedOrder.UserId=this.userService.LoggedUser.UserId;
      this.pickedOrder.User=this.userService.LoggedUser;
    }
    }
  }
  
  ngOnInit(): void {  
   
  }
  ngAfterViewInit():void{
    console.log("ngAfterViewInit");
    this.pickFromUserListFlag=false;

    if(!this.pickedOrder){
      console.log("!this.pickedOrder")
      this.Reset();
    }
    else
    {
      if((!this.pickedOrder.OrderTemplateId)||(!this.pickedOrder.StartOfOrder)||(!this.pickedOrder.UserId)){
        console.log("brak orderTemplateId/StartOfOrder/UserId");
        console.log(this.pickedOrder.OrderTemplateId,this.pickedOrder.StartOfOrder,this.pickedOrder.UserId);
        this.Reset();
      }
      else //kiedy jest stworzony pickedOrder oraz wypełnione jest OrderTemplateId oraz StartOfOrder
      {
        console.log("SetAllFlags");
        this.SetAllFlags();
      }
  }
  }

  pickFromUserListFlag: boolean=false;
  pickFromDateFlag: boolean=false;
  
//   // pickedUserToOrder: User;
  set pickedOrder(or:Order){
    if(!this.orderService.NewOrder){
      this.orderService.NewOrder=new Order();
    }
    this.orderService.NewOrder=or;
  }
  get pickedOrder():Order{
    return this.orderService.NewOrder;
  }
  
  get PickedDate():Date{
    if(this.pickedOrder){
      if(this.pickedOrder.StartOfOrder){
        return this.pickedOrder.StartOfOrder;
      }
    }
    return null;
  }
  set PickedDate(dt:Date) {
    if(!this.pickedOrder){
      this.pickedOrder=new Order();
    }
    this.pickedOrder.StartOfOrder=dt;
  };

  public showInfoFlag: boolean=false;
  private showEditFlag: boolean=false;

  get pickedOrderTemplate():OrderTemplate{
    if(this.pickedOrder){
      if(this.pickedOrder.OrdersTemplate){
        return this.pickedOrder.OrdersTemplate;
      }
    }
    return null;
  }
  set pickedOrderTemplate(or:OrderTemplate) {
    if(!this.pickedOrder){
      this.pickedOrder=new Order();
    }
    this.pickedOrder.OrdersTemplate=or;
    this.pickedOrder.Cost=or.MinCost;
    this.pickedOrder.OrderTemplateId=or.OrderTemplateId

  };
  get ShowEditFlag(): boolean {
    return this.showEditFlag;
  }
  set ShowEditFlag(flag: boolean) {
    this.showEditFlag = this.userService.shouldIShownItem(UserRights.EmployeeUser) ? flag : false;
  }

   acceptOrderFlag:boolean;  //   return this.showInfoFlag&&this.pickFromDateFlag&&(this.PickedDate!=null);

        

  SetAllFlags(){
    this.showInfoFlag=true;
    this.pickFromDateFlag=true;
    this.acceptOrderFlag=true;
  }
 
  changeShowEditFlag(flag: boolean) {
    this.showInfoFlag = false;
    this.showEditFlag = flag;
  }
//   //pokazuje detale -> prześlij do komponentu listy
  ShowDetails(orderT: OrderTemplate) {
    console.log("ShowDetailsFun");
    this.pickedOrderTemplate = Object.assign({}, orderT);
    this.showInfoFlag = true;
    this.showEditFlag = false;
  } 
//   //jest conajmniej pracownikiem -> sprawdź czy można edytować orderTemplate
  IsAtLeastEmploye(): boolean {
    return this.userService.shouldIShownItem(UserRights.EmployeeUser);
  }
//   //po pierwszym kliknięciu"zamów"
  OrderThis() { 
      this.pickFromDateFlag = true;
  }


//   //Jeśli jest się powyżej normal usera to wybiera się dla kogo jest order
  PickUserToOrder(user:User){
    
    // this.pickedOrder.User=user;
    this.pickedOrder.UserId=user.UserId;
  
     //chowamy listę userów bo już nam nie potrzebna
     this.pickFromUserListFlag=false;
     this.acceptOrderFlag=true;
 }

//  //na koniec wybierz datę
//   //jeśli zamawia pracownik/admin to musi wskazać dla jakiego użytkownika zamawia lub stworzyć tymczasowego użytkownika, 
//     // jeśli zamawia klient to od razu dla siebie
  PickDate(date: Date) {
      if (this.userService.GetUserRights() >= UserRights.EmployeeUser) {
      this.pickFromUserListFlag = true;
      this.acceptOrderFlag=false;
    } else {
     
      if(this.userService.IsLoggedIn){
         //jeśli jest zalogowany ale nie jest EMployee wtedy zawsze zamawia sam dla siebie 
      this.pickedOrder.UserId=this.userService.LoggedUser.UserId;
      this.pickedOrder.User=this.userService.LoggedUser;
      }else{
        //jesli jest niezalogowany!!!
      }
      

      this.pickFromUserListFlag = false;
      this.acceptOrderFlag=true;
    }
  

    this.PickedDate = date;
    this.pickedOrder.ExpectedStartOfOrder=this.PickedDate;
   
  }
//   //po wybraniu daty pokaże się okienko z zaakceptowaniem informacji: zaakceptuj
   AcceptOrder(){
    console.log("AcceptOrder");
    if(this.userService.IsLoggedIn){
      if (this.userService.GetUserRights() >= UserRights.EmployeeUser){
        //jeśli zaloguje się jako admin w trakcie jako admin/employee i nie wybierze userId
        if(!this.pickedOrder.UserId){
          this.pickFromUserListFlag = true;
          this.acceptOrderFlag=false;
          return;
        }
      }
      this.pickedOrder.CreateOrderUserId=this.userService.LoggedUser.UserId;
    

      this.SendOrder();
    }else{
      this.GoToLogin();
    }
  }

  public CancelOrder(){
    console.log("cancel");
    this.pickedOrder=new Order();
    this.showInfoFlag=false;
    this.pickFromDateFlag=false;
  }
  private GoToLogin(){
    this.router.navigate(["Select_Log_Type"]);
  }

  private SendOrder(){
    this.orderService.postOrder(this.pickedOrder).subscribe((data:Result<Order>)=>{
      if(data.status){
        console.log("poprawnie dodało");
        this.pickedOrder=new Order();
        this.router.navigate(["User_Orders"]);
      }else{
        console.log("PostOrderError",data.info);
      }
    },
    (error:any)=>{
      console.log("PostOrderError",error);
    }
    )
  }

  // private CreateOrder(createUser:User,date:Date){
  //   // console.log(this.pickedUserToOrder);
  //   if(!this.pickedUserToOrder.UserId||this.pickedUserToOrder.UserId==0){
  //     this.pickedUserToOrder=createUser;
  // }
  // if(!this.pickedOrderTemplate){
  //   console.log("nie wybrano template");
  //   return;
  // }
  // var order=new Order();
  // // order.CreateOrderUserId=createUser.UserId;
  // order.IsPaid=false;
  // order.OrderTemplateId=this.pickedOrderTemplate.OrderTemplateId;
  // // order.UserId=this.pickedUserToOrder.UserId;
  // order.Cost=this.pickedOrderTemplate.MinCost;
  // order.ExpectedStartOfOrder=date;

  // }




}

