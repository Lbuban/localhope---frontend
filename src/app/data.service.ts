import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

    private baseUrl = 'https://localhope-backend.herokuapp.com/'

    constructor(private http: Http) { }

  //getting the data from the backend.
    getRecords(endpoint: string): Observable<any[]> {
        let apiUrl = this.baseUrl+endpoint;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCharityNeeds(userID): Observable<any[]> {
        let apiUrl = `${this.baseUrl}charity/${userID}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCharityNeed(endpoint, userId): Observable<any[]> {
        let apiUrl = `${this.baseUrl}${endpoint}/${userId}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Post to the backend

    addRecord(endpoint: string, record: object): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record)
            .map(this.extractData);
    }


    addCharityNeed(endpoint: string, userID, record): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}/${userID}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record)
            .map(this.extractData);
    }

    postFollowCharity(endpoint:string, userID, record):Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}/${userID}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        console.log(apiUrl)
        return this.http.post(apiUrl, record, options)
            .map(this.extractData);
    }

     postNeedMet(endpoint:string, needId, record):Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}/${needId}`;
       let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        console.log(apiUrl)
        return this.http.post(apiUrl, record, options)
            .map(this.extractData);
    }

     postNotifyFollowers(endpoint: string, charityID: number, NeedID: number) : Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let apiUrl = `${this.baseUrl}${endpoint}/${charityID}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, NeedID, options)
            .map(this.extractData);
    }
    
    addDecrementNeed(endpoint: string, userID, record): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}/${userID}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        
        console.log(apiUrl)
        return this.http.post(apiUrl, record, options)
            .map(this.extractData);
    }

//put to the back end for edits
        editRecord(endpoint: string, record: object, userID: number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${userID}`;
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }


    //deletes
     //Charity need Delete function: string="deleteneed", needid="#"
    deleteRecord(endpoint: string, needid:number, userId:string): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}/${needid}`;
        console.log(needid, userId, "service")
        return this.http.delete(apiUrl, userId )
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let results = res.json();
        return results || [];
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (typeof error._body === "string") {
            errMsg = error._body
        } else {
            if (error instanceof Response) {
                if (error.status === 0) {
                    errMsg = "Error connecting to API"
                } else {
                    const errorJSON = error.json();
                    errMsg = errorJSON.message;
                }
            }
        }

        return Observable.throw(errMsg);
    }
   
 
   

  
}

