import { Deserializable } from './deserializable.model';
import { Binary } from '@angular/compiler';

export class OrderTemplateImage implements Deserializable {
    deserialize(input: any): OrderTemplateImage {
        this.ImageId = input["ImageId"];
        this.OrderTemplateId = input["OrderTemplateId"];
        this.AdditionalInformation = input["AdditionalInformation"];
        var data:string=input["Image"];
        this.Image = encodeURI(data);
        return this;
    }
    ImageId: number;
    OrderTemplateId: number;
    AdditionalInformation: string;
    Image: String;
}
