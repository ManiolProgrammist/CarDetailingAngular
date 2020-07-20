import { Deserializable } from './deserializable.model';
import { DayInfo } from './day-info.model';
export class Options implements Deserializable {
    deserialize(input: any): Options {
        var ret=<Options>input;
        return ret;
    }
    Days:DayInfo[];
}


// export class DayInfo implements Deserializable{
//     deserialize(input: any): DayInfo {
//         var ret=<DayInfo>input;
//         return ret;
//     }
//     Name:string;
//     IsOpen:boolean;
//     OpenHour:string;
//     CloseHour:string;
// }
