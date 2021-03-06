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
        let apiUrl = this.baseUrl + endpoint;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }



    getNeed(endpoint, userId): Observable<any[]> {
        let apiUrl = `${this.baseUrl}${endpoint}/${userId}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Post to the backend

    addRecord(endpoint: string, record: object): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        return this.http.post(apiUrl, record)
            .map(this.extractData);
    }

    passwordReset(endpoint: string, record: object): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(apiUrl, record, options)
            .map(this.extractData);
    }


    postRecord(endpoint: string, needId, record): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}/${needId}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

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

      editPassword(endpoint: string, record: object,): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }


    //deletes
    //Charity need Delete function: string="deleteneed", needid="#"
    deleteRecord(endpoint: string, needid: number, userId: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let apiUrl = `${this.baseUrl}${endpoint}/${needid}`;
        return this.http.put(apiUrl, userId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {

        var results;
        try {
            results = res.json();
        } catch (e) {
            if (res.status >= 200 && res.status <= 300) {
                results = []
            } else {
                return Observable.throw(e);
            }
        }

        return results;
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

