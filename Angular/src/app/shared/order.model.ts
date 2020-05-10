import { TimeSpan } from '../time-span';
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
    OrderInformations:OrderInformations[]|null;
    OrdersTemplate:OrderTemplate;


    deserialize(value: any): Order {
        var ret=new Order();
        ret.OrderId=value.OrderId;
        ret.UserId=value.UserId;
        ret.User=value.User;
        ret.CreateOrderUserId=value.CreateOrderUserId;
        ret.OrderTemplateId=value.OrderTemplateId;
        ret.OrderDate=new Date(value.OrderDate);
        if(ret.ExpectedStartOfOrder!=null){
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
        ret.OrderInformations=value.OrderInformations;
        ret.OrdersTemplate=value.OrdersTemplate;

       return ret;
    }
}

