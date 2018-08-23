import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Http} from '@angular/http';

import {Message} from '../models/message';
import {Stream} from '../models/stream';
//
const API_URL = environment.apiUrl;

@Injectable()
export class KinesisService {

  constructor(private http: Http) { }

  getTopics(): Observable<Stream[]> {
      return this.http
          .get(API_URL + '/topics')
          .map(response => {
              const topics = response.json();
              return topics.map((topic) => new Stream(topic));
          })
          .catch(this.handleError);
  }

  private handleError (error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
  }
}
