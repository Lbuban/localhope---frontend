import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CharityService {

  private baseUrl = "https://api.data.charitynavigator.org/v2/Organizations/"

  constructor (private http: Http) {}
  
getCharityList(ein: string): Observable<any[]> {
  let apiUrl = this.baseUrl+ ein + "?app_id=e35eaadd&app_key=030589f4c21e566f0a0e3aeb51a210e1";
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