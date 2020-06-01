import { Deserializable } from '../deserializable.model';

export class RegisterUser implements Deserializable  {
    deserialize(input: any): RegisterUser {
        var ret=<RegisterUser>input;
        return ret;
    }
    Login: string;
    Password: string;
    Email: string;
    FirstName: string;
    Surname: string;
    PhoneNumber: string;
}
