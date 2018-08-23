import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Callback, CognitoUtil} from './cognito.service';
import { Observable } from 'rxjs/Observable';


export class TokenStuff {
    public accessToken: string;
    public idToken: string;
}

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(public cognitoUtil: CognitoUtil) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tmpStuff = new TokenStuff();
        this.cognitoUtil.getAccessToken(new AccessTokenCallback(tmpStuff));
        request = request.clone({
            setHeaders: {
                Authorization: `${tmpStuff.accessToken}`
            }
        });
        return next.handle(request);
    }
}


export class AccessTokenCallback implements Callback {
    constructor(public tknStuff: TokenStuff) {

    }

    callback() {

    }

    callbackWithParam(result) {
        this.tknStuff.accessToken = result;
    }
}

export class IdTokenCallback implements Callback {
    constructor(public tknStuff: TokenStuff) {

    }

    callback() {

    }

    callbackWithParam(result) {
        this.tknStuff.idToken = result;
    }
}