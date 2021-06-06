import { User } from './shared/UserModels/user.model';

const rootURL: string = "http://localhost:51547/api/";
//http://localhost:51547/
const passwordPath: string = "password";
const LoginPath: string = "username";
const DontLogMeOutPath: string = "dontlogmeout";
const TokenPath:string ="token";
export class StaticInfo {
    static getRootUrl() {
        return rootURL;
    }
    static getPasswordPath() {
        return passwordPath;
    }
    static getLoginPath() {
        return LoginPath;
    }
    static getDontLogMeOutPath() {
        return DontLogMeOutPath;
    }
    static getTokenPath(){
        return TokenPath;
    }
    
    static IsUserLogged: boolean;
    
}

