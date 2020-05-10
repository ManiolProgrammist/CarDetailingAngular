import { Deserializable } from '../deserializable.model';

export class LoginUser implements Deserializable  {
    deserialize(input: any): LoginUser {
        var ret=<LoginUser>input;
        return ret;
    }
    Login: string;
    Password: string;
}
