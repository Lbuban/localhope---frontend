import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  private baseUrl = 'https://localhope-backend.herokuapp.com/'

  constructor (private http: Http) {}

  //getting the data from the backend.
  getRecords(endpoint: string): Observable<any[]> {
    let apiUrl = this.baseUrl+endpoint;
    return this.http.get(apiUrl)
        .map(this.extractData)
        .catch(this.handleError);
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

