import { User } from './shared/UserModels/user.model';

const rootURL: string = "http://localhost:52951/api/";
const passwordPath: string = "password";
const LoginPath: string = "username";
const DontLogMeOutPath: string = "dontlogmeout";
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
    static IsUserLogged: boolean;
}
