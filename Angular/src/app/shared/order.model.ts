import { TimeSpan } from '../time-span';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { User } from './UserModels/user.model';
import { OrderInformations } from './order-informations.model';

export class Order {
    OrderId: number;
    UserId: number;
    User:User;
    CreateOrderUserId: number;
    OrderTemplateId: number;
    OrderDate: Date;
    ExpectedStartOfOrder:Date|null;
    CompletedOrderDate: Date|null;
    Cost: number;
    IsOrderCompleted: boolean;
    IsOrderStarted:boolean;
    OrderInformations:OrderInformations[];
}
