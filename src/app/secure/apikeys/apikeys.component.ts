import {Component} from '@angular/core';
import {UserLoginService} from '../../service/user-login.service';
import {CognitoUtil, LoggedInCallback} from '../../service/cognito.service';
import {ApigatewayService} from '../../service/apigateway.service';
import {Router} from '@angular/router';

import {Apikey} from '../../models/apikey';


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './apikeys.html'
})
export class ApikeysComponent implements LoggedInCallback {

    public keys: Array<Apikey> = [];
    public cognitoId: String;
    public addingFlag = false;
    public newName: string;

    constructor(public router: Router, public userService: UserLoginService,
                public gatewayService: ApigatewayService,
                public cognitoUtil: CognitoUtil) {
        this.userService.isAuthenticated(this);
        this.newName = '';
        console.log('In KafkaComponent');
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        this.gatewayService.loadApiKeys();
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.gatewayService.apiKeys.subscribe(
                (keys) => {
                    if (keys) {
                        this.keys = keys;
                    }
                }
            );
        }
    }

    startAdd() {
        this.addingFlag = true;
    }

    submitAPIKey() {
        if (this.newName !== '') {
            this.gatewayService.addApiKey(this.newName);
        } else {
            console.log('Could not add name');
        }
        this.addingFlag = false;
        this.newName = '';
    }

    cancelAPIKey() {
        this.addingFlag = false;
        this.newName = '';
    }

    deleteAPIKey(keySent) {
        console.log(keySent);
        this.gatewayService.deleteApikey(keySent.id)
    }
}


