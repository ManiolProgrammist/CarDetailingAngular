import { OrderTemplateImage } from './order-template-image.model';
import { Deserializable } from './deserializable.model';
import { OrderTemplateService } from './services/order-template.service';


export class OrderTemplate implements Deserializable {
    constructor(){
        this.OrderTemplateId=0;
    }
    deserialize(input: any) {
        this.OrderTemplateId=input["OrderTemplateId"];
        this.MaxCost=input.MaxCost;
        this.MinCost=input.MinCost;
        this.Name=input.Name;
        this.AdditionalInformation=input.AdditionalInformation;
        this.ExpectedTime=input.ExpectedTime;
        var array=new Array();
        array=input.OrdersTemplateImages;
        this.OrdersTemplateImages=new Array<OrderTemplateImage>();
        array.forEach((e)=>{
            this.OrdersTemplateImages.push(new OrderTemplateImage().deserialize(e));
        })
        return this;
    }
    OrderTemplateId: number;
    MaxCost: number;
    MinCost: number;
    Name: string;
    AdditionalInformation: string;
    ExpectedTime: string="00:00:00";
     OrdersTemplateImages:OrderTemplateImage[];
    // constructor(){
    //     this.hours=0;
    // }
    copy(OrderT:OrderTemplate){
        this.OrderTemplateId=OrderT.OrderTemplateId;
        this.ExpectedTime=OrderT.ExpectedTime;
        this.MaxCost=OrderT.MaxCost;
        this.MinCost=OrderT.MinCost;
        this.Name=OrderT.Name;
        
        this.AdditionalInformation=OrderT.AdditionalInformation;
        this.OrdersTemplateImages=new Array<OrderTemplateImage>();
        OrderT.OrdersTemplateImages.forEach(e=>{
            this.OrdersTemplateImages.push(e);
        })
    }

}
