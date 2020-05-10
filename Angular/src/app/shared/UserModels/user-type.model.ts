import { Deserializable } from '../deserializable.model';

export class UserType implements Deserializable  {
    deserialize(input: any): UserType {
        var ret=<UserType>input;
        return ret;
    }
    UserTypeId:number;
    AccessRights:number;
    Name:string;
}
