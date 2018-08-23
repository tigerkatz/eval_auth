import {Component} from '@angular/core';
import {UserLoginService} from '../../service/user-login.service';
import {CognitoUtil, LoggedInCallback} from '../../service/cognito.service';
import {KinesisService} from '../../service/kinesis.service';
import {Router} from '@angular/router';
import {Message} from '../../models/message';
import {Stream} from '../../models/stream';


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './kinesis.html'
})
export class KinesisComponent implements LoggedInCallback {

    public records: Array<Message> = [];
    public topics: Array<Stream> = [];
    public cognitoId: String;

    constructor(public router: Router, public userService: UserLoginService,
                public kafkaService: KinesisService,
                public cognitoUtil: CognitoUtil) {
        this.userService.isAuthenticated(this);
        console.log('In KafkaComponent');
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            // this.kafkaService.getTopics().subscribe(
            //     (topics) => {
            //         this.topics = topics
            //     }
            // );
        }
    }
}


