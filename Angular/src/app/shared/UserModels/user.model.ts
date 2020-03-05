import { UserType } from './user-type.model';

export class User {
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
