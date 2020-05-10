import { Deserializable } from './deserializable.model';

export class OrderInformations implements Deserializable  {
    deserialize(input: any): OrderInformations {
        var ret=<OrderInformations>input;
        return ret;
    }
    InformationId: number;
    OrderId: number;
    TypeOfInformation: string;
    Information: string;

}
