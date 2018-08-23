import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

import {Api} from '../models/api';
import {Apikey} from '../models/apikey';
import {Usageplan} from '../models/usageplan';
import {Usageplankey} from '../models/usageplankey';

import * as AWS from 'aws-sdk/global';
import * as APIGateway from 'aws-sdk/clients/apigateway'

@Injectable()
export class ApigatewayService {


  private apigateway: APIGateway;

  apiKeys: Observable<Apikey[]>;
  private _apiKeys: BehaviorSubject<Apikey[]>;

  private dataStore: {
    apiKeys: Array<Apikey>
  };




  constructor() {
    console.log('In APIGatewayService');
    this.apigateway = new APIGateway();

    this._apiKeys = <BehaviorSubject<Apikey []>>new BehaviorSubject([]);
    this.dataStore = {apiKeys: []};
    this.apiKeys = this._apiKeys.asObservable();
  }

  getApi(): Observable<Api> {
    return null
  }


  getUsagePlans(): Observable<Usageplan []> {
    return null
  }

  loadApiKeys(): void {
      let apikeys_params = {
          // customerId: 'STRING_VALUE',
          includeValues: true,
          limit: 500,
          // nameQuery: 'STRING_VALUE',
          // position: '0'
      };
      let context = this;
      this.apigateway.getApiKeys(apikeys_params, function (err, data) {
          if (err) {
              console.log(err, err.stack);
          } else {
            console.log(data);
            let tmpArray: Array<Apikey> = [];
            for (let i of data.items) {
                if (i) {
                    let tmpApiKey: Apikey = new Apikey(i);
                    tmpArray.push(tmpApiKey);
                }
            }
            context.dataStore.apiKeys = tmpArray;
            context._apiKeys.next(Object.assign({}, context.dataStore).apiKeys);
          }
      });
  }

  getUsagePlanKeys(): Observable<Usageplankey []> {
    return null
  }

  addApiKey(nameSent: string): void {

    let tmpKey = {
      name: nameSent, enabled: true, generateDistinctId: true
    };

    let context = this;
    this.apigateway.createApiKey(tmpKey, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
            let params = {
                keyId: data.id, /* required */
                keyType: 'API_KEY', /* required */
                usagePlanId: environment.usagePlanId /* required */
            };
            let above = context;
            context.apigateway.createUsagePlanKey(params, function(err_usage, data_usage) {
                if (err_usage) {
                    console.log(err_usage, err_usage.stack);
                } else {
                    console.log(data_usage);
                    above.loadApiKeys();
                }
            });
        }
    });

  }

    deleteApikey(idSent: string): void {
        console.log('Deleted');
        let params = {
            apiKey: idSent /* required */
        };
        let context = this;
        this.apigateway.deleteApiKey(params, function(err, data) {
            if (err) {
              console.log(err, err.stack);
            }else {
              context.loadApiKeys()
            }
        });
    }


}
