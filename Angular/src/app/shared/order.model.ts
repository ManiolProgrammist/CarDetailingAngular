
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { User } from './UserModels/user.model';
import { OrderInformations } from './order-informations.model';
import {Deserializable} from "./deserializable.model";
import { OrderTemplate } from './order-template.model';
export class Order implements Deserializable {
    OrderId: number;
    UserId: number;
    User:User;
    CreateOrderUserId: number;
    OrderTemplateId: number;
    OrderDate: Date;
    ExpectedStartOfOrder:Date|null;
    CompletedOrderDate: Date|null;
    StartOfOrder:Date|null;
    Cost: number;
    IsOrderCompleted: boolean;
    IsOrderStarted:boolean;
    OrdersInformations:OrderInformations[]|null;
    OrdersTemplate:OrderTemplate;
    IsPaid:boolean;
    delays:number;

    deserialize(value: any): Order {
        var ret=new Order();
        if(value!=null){
        
        ret.OrderId=value.OrderId;
        ret.UserId=value.UserId;
        ret.User=value.User;
        ret.CreateOrderUserId=value.CreateOrderUserId;
        ret.OrderTemplateId=value.OrderTemplateId;
        ret.OrderDate=new Date(value.OrderDate);
        if(value.ExpectedStartOfOrder!=null){
            ret.ExpectedStartOfOrder= new Date(value.ExpectedStartOfOrder);
        }
        if(value.CompletedOrderDate!=null){
            ret.CompletedOrderDate=new Date(value.CompletedOrderDate);
        }
        if(value.StartOfOrder!=null){
            ret.StartOfOrder=new Date(value.StartOfOrder);
        }
        ret.Cost=value.Cost;
        ret.IsOrderCompleted=value.IsOrderCompleted;
        ret.IsOrderStarted=value.IsOrderStarted;
        ret.OrdersInformations=value.OrdersInformations;
        ret.OrdersTemplate=value.OrdersTemplate;
        ret.IsPaid=value.IsPaid;
        ret.delays=value.delays;
       
    }
    return ret;
    }
}

