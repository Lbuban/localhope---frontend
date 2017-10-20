import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CharityService {

  private baseUrl = "https://localhope-backend.herokuapp.com/"

  constructor (private http: Http) {}


//function to pull charities based on location
locateUser(endpoint:string, userID, record):Observable<any> {
    let apiUrl = `${this.baseUrl}${endpoint}/${userID}`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    console.log(apiUrl)
    return this.http.post(apiUrl, record, options)
        .map(this.extractData);
}

locateNearMe(endpoint:string, distance, record):Observable<any> {
    let apiUrl = `${this.baseUrl}${endpoint}/${distance}`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    console.log(apiUrl)
    return this.http.post(apiUrl, record, options)
        .map(this.extractData);
}

  //take the response and turn it into JSON
  private extractData(res: Response) {
    let results = res.json();
    return results || [];
  }

private handleError(error: Response | any) {
  let errMsg: string;
  if(typeof error._body === "string"){
      errMsg = error._body
  }else{
      if (error instanceof Response) {
          if(error.status === 0){
              errMsg = "Error connecting to API"
          }else{
              const errorJSON = error.json();
              errMsg = errorJSON.message;
          }
      }
  }

  return Observable.throw(errMsg);
}
}