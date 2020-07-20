import { Deserializable } from './deserializable.model';

export class DayInfo  implements Deserializable {
        deserialize(input: any): DayInfo {
        var ret=<DayInfo>input;
        return ret;
    }
    Name:string;
    IsOpen:boolean;
    OpenHour:string;
    CloseHour:string;
}
