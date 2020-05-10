import { UserType } from './user-type.model';
import { Deserializable } from '../deserializable.model';

export class User implements Deserializable  {
    deserialize(input: any): User {
        var ret=<User>input;
        return ret;
    }
    UserId: number;
    Login: string;
    Password: string;
    Email: string;
    FirstName: string;
    Surname: string;
    PhoneNumber: string;
    AccoutCreateDate: Date;
    UserTypeId:number;
    UserType:UserType;
    // IsAdmin: boolean;
    // IsEmployee: boolean;
    // IsTemporary:boolean;
    // PictureId: number|null|undefined;
    InformationId: number|null|undefined;
    
}
