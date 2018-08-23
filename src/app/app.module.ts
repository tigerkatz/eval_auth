import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {UserRegistrationService} from './service/user-registration.service';
import {UserParametersService} from './service/user-parameters.service';
import {KinesisService} from './service/kinesis.service';
import {UserLoginService} from './service/user-login.service';
import {CognitoUtil} from './service/cognito.service';
import {routing} from './app.routes';
import {AboutComponent, HomeComponent, HomeLandingComponent} from './public/home.component';
import {AwsUtil} from './service/aws.service';
import {MyProfileComponent} from './secure/profile/myprofile.component';
import {SecureHomeComponent} from './secure/landing/securehome.component';
import {JwtComponent} from './secure/jwttokens/jwt.component';
import {LoginComponent} from './public/auth/login/login.component';
import {RegisterComponent} from './public/auth/register/registration.component';
import {ForgotPassword2Component, ForgotPasswordStep1Component} from './public/auth/forgot/forgotPassword.component';
import {LogoutComponent, RegistrationConfirmationComponent} from './public/auth/confirm/confirmRegistration.component';
import {ResendCodeComponent} from './public/auth/resend/resendCode.component';
import {NewPasswordComponent} from './public/auth/newpassword/newpassword.component';
import { MFAComponent } from './public/auth/mfa/mfa.component';
import {KinesisComponent} from './secure/kinesis/kinesis.component';
import { ApigatewayService } from './service/apigateway.service';
import {ApikeysComponent} from './secure/apikeys/apikeys.component';


@NgModule({
    declarations: [
        NewPasswordComponent,
        LoginComponent,
        LogoutComponent,
        RegistrationConfirmationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        RegisterComponent,
        MFAComponent,
        AboutComponent,
        HomeLandingComponent,
        HomeComponent,
        MyProfileComponent,
        SecureHomeComponent,
        JwtComponent,
        AppComponent,
        KinesisComponent,
        ApikeysComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        KinesisService,
        CognitoUtil,
        AwsUtil,
        UserRegistrationService,
        UserLoginService,
        UserParametersService,
        ApigatewayService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
