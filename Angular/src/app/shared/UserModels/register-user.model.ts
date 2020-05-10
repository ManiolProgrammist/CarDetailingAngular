import { Deserializable } from '../deserializable.model';

export class RegisterUser implements Deserializable  {
    deserialize(input: any): RegisterUser {
        var ret=<RegisterUser>input;
        return ret;
    }
    login: string;
    password: string;
    email: string;
    firstName: string;
    surname: string;
    phoneNumber: string;
}
