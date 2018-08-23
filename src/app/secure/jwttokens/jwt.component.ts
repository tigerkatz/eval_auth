import {Component} from '@angular/core';
import {UserLoginService} from '../../service/user-login.service';
import {Callback, CognitoUtil, LoggedInCallback} from '../../service/cognito.service';
import {Router} from '@angular/router';


export class Stuff {
    public accessToken: string;
    public idToken: string;
    public refreshToken: string;
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './jwt.html'
})
export class JwtComponent implements LoggedInCallback {

    public stuff: Stuff = new Stuff();

    constructor(public router: Router, public userService: UserLoginService, public cognitoUtil: CognitoUtil) {
        this.userService.isAuthenticated(this);
        console.log('in JwtComponent');

    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.cognitoUtil.getAccessToken(new AccessTokenCallback(this));
            this.cognitoUtil.getIdToken(new IdTokenCallback(this));
            this.cognitoUtil.getRefreshToken(new RefreshTokenCallback(this));
        }
    }
}

export class AccessTokenCallback implements Callback {
    constructor(public jwt: JwtComponent) {

    }

    callback() {

    }

    callbackWithParam(result) {
        this.jwt.stuff.accessToken = result;
    }
}

export class IdTokenCallback implements Callback {
    constructor(public jwt: JwtComponent) {

    }

    callback() {

    }

    callbackWithParam(result) {
        this.jwt.stuff.idToken = result;
    }
}

export class RefreshTokenCallback implements Callback {
    constructor(public jwt: JwtComponent) {

    }

    callback() {

    }

    callbackWithParam(result) {
        console.log(result);
        if (result.hasOwnProperty('token')) {
            this.jwt.stuff.refreshToken = result['token'];
        }

    }
}
