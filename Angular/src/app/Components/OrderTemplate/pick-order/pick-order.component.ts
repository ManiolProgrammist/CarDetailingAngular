import { Component, OnInit } from '@angular/core';
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
export class PickOrderComponent implements OnInit {

  constructor(public orderTemplateService: OrderTemplateService, public userService: UserService, public router: Router,private orderService:OrderService) { 
    this.pickFromUserListFlag=false;
    this.pickFromDateFlag=false;
    this.pickedUserToOrder=new User();
    this.PickedDate=null;
  }

  pickFromUserListFlag: boolean;
  pickFromDateFlag: boolean;
  pickedUserToOrder: User;
  PickedDate: Date;


  public showInfoFlag: boolean;
  private showEditFlag: boolean;
  pickedOrderTemplate: OrderTemplate;
  ngOnInit(): void {
  }
  get ShowEditFlag(): boolean {
    return this.showEditFlag;
  }
  set ShowEditFlag(flag: boolean) {
    this.showEditFlag = this.userService.shouldIShownItem(UserRights.EmployeeUser) ? flag : false;
  }
 
  changeShowEditFlag(flag: boolean) {
    this.showInfoFlag = false;
    this.ShowEditFlag = flag;
  }
  //pokazuje detale -> prześlij do komponentu listy
  ShowDetails(orderT: OrderTemplate) {

    this.pickedOrderTemplate = Object.assign({}, orderT);
    this.showInfoFlag = true;
    this.ShowEditFlag = false;
  } 
  //jest conajmniej pracownikiem -> sprawdź czy można edytować orderTemplate
  IsAtLeastEmploye(): boolean {
    return this.userService.shouldIShownItem(UserRights.EmployeeUser);
  }
  //po pierwszym kliknięciu"zamów"
  OrderThis() { //jeśli zamawia pracownik/admin to musi wskazać dla jakiego użytkownika zamawia lub stworzyć tymczasowego użytkownika, 
    // jeśli zamawia klient to od razu dla siebie
    if (this.userService.GetUserRights() >= UserRights.EmployeeUser) {

      this.pickFromUserListFlag = true;
    } else {

      this.pickFromUserListFlag = false;
      this.pickFromDateFlag = true;
      //wybierz termin
    }
  }
  //Jeśli jest się powyżej normal usera to wybiera się dla kogo jest order
  PickUserToOrder(user:User){
    this.pickedUserToOrder=user;
     this.pickFromDateFlag=true;
     //chowamy listę userów bo już nam nie potrzebna
     this.pickFromUserListFlag=false;
 }

 //na koniec wybierz datę
  PickDate(date: Date) {
    this.PickedDate = date;
    var createUser=new User();

      this.userService.getLogUserInfo().subscribe((data:Result<User>)=>{
        if(data.status){
          console.log("zalogowany user:",data.value)
          createUser=data.value;
          this.CreateAndSendOrder(createUser,this.PickedDate);

        }else{
          console.log("PickOrderError: nie znaleziono zalogowanego usera")
          return;
        }
      });
 
    // console.log("najwyzsza funkcja mowi:", date);
  }
  private CreateAndSendOrder(createUser:User,date:Date){
    // console.log(this.pickedUserToOrder);
    if(!this.pickedUserToOrder.UserId||this.pickedUserToOrder.UserId==0){
      this.pickedUserToOrder=createUser;
  }
  if(!this.pickedOrderTemplate){
    console.log("nie wybrano template");
    return;
  }
  var order=new Order();
  order.CreateOrderUserId=createUser.UserId;
  order.IsPaid=false;
  order.OrderTemplateId=this.pickedOrderTemplate.OrderTemplateId;
  order.UserId=this.pickedUserToOrder.UserId;
  order.Cost=this.pickedOrderTemplate.MinCost;
  order.ExpectedStartOfOrder=date;
  order.IsOrderCompleted=false;
  order.IsOrderStarted=false;
  console.log(order);
  this.orderService.postOrder(order).subscribe((data:Result<Order>)=>{
    if(data.status){
      console.log("poprawnie dodało");
      this.router.navigate(["Order_List"]);
    }else{
      console.log("Error",data.info);
    }
  },
  (error:any)=>{
    console.log("PostOrderError",error);
  }
  )
  
  }


}

