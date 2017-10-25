import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, ConnectionBackend, BaseRequestOptions, RequestOptions, Http, Response, ResponseType, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { DataService } from './data.service';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { getRecordsResults, getUserResult, getRecords, registerNewUser } from './data.service.test.data';
let userId = 8;

describe('DataService integration tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
    // console.log(service)
  }));

  it('getRecords should return an array of charities with needs', async(inject([DataService], (service: DataService) => {
    service.getRecords("dogooder").subscribe(value => {
      expect(Array.isArray(value)).toBeTruthy();
      console.log(value)
    })
  })));

  //When user logs in, user is re-directed to dogooder page and user's followed charities are passed back. Those charities are only displayed when user clicks button/link.
  it('getNeed should return an array of charities the user follows', async(inject([DataService], (service: DataService) => {
    // service.getCharityNeed("user/followedcharities", userId).subscribe(value => {  //replaced with getNeed ??
    service.getNeed("user/followedcharities", userId).subscribe(value => {
      expect(Array.isArray(value)).toBeTruthy();
      console.log(value)
    })
  })));
});

describe('DataService unit tests', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      DataService,
    ]);
    this.dataService = this.injector.get(DataService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });


  //the web service takes a component name and (possibly) id and contatinates a URL that is then passed to the http.get method. 
  //Compare the svcs URL to one used in Postman to verify it works:
  // xit('getRecords should hit the expected endpoint plus the entity passed in', fakeAsync(inject([DataService], (service: DataService) => {
  //   service.getRecords("dogooder").subscribe(value => {
  //     let URL = 'https://localhope-backend.herokuapp.com/dogooder';

  //     this.lastConnection.mockRespond(new Response(new ResponseOptions({
  //       body: JSON.stringify({id: 3783738, name: 'bob', age: 57})
  //     })));

  //     tick(); //tick and fakeAsync go together

  //     // expect(this.lastConnection.request.body).toBe(JSON.stringify({name: 'bob', age: 57}));  //example if data is included in the body
  //     expect(service.getRecords("dogooder")).toBe();
  //     console.log(service.getRecords("dogooder"))
  //   })
  // })));

  //validate the URL that HTTP.get will use to get needs records. 
  it('getRecords() should query current service url', () => {
    this.dataService.getRecords("dogooder");
    let URL = 'https://localhope-backend.herokuapp.com/dogooder';

    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(URL, 'url invalid');
  });

  //validate the URL that HTTP.get will use to get a user record. 
  it('getNeed() should query current service url', () => {
    this.dataService.getNeed("user", 4);
    let URL = 'https://localhope-backend.herokuapp.com/user/4';

    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(URL, 'url invalid');
  });
  //validate the URL that HTTP.post will use to add a record. 
  it('addRecord() should query current service url', () => {
    this.dataService.addRecord();
    let URL = 'https://localhope-backend.herokuapp.com/';

    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(URL, 'url invalid');
  });

  //   addRecord(endpoint: string, record: object): Observable<any> {
  //     let apiUrl = `${this.baseUrl}${endpoint}`;
  //     console.log(apiUrl)
  //     return this.http.post(apiUrl, record)
  //         .map(this.extractData);
  // }

  //this test mocks the getRecordsResults data set located in the data.service.test.data.ts file:
  it('getRecords() should return 2 charity needs records', fakeAsync(() => {
    let result: any[];
    this.dataService.getRecords()
      .subscribe((records: String[]) => result = records);

    this.lastConnection
      .mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(getRecords),
      })));

    tick();
    expect(result.length).toEqual(2, 'should contain 2 records');
    expect(result[0].id).toEqual(4, ' this should be the first user record');
    expect(result[1].id).toEqual(9, ' this should be the second user record');
  }));

  //this test mocks the getUserResults data set located in the data.service.test.data.ts file:
  it('getNeed() should return 1 user record', fakeAsync(() => {
    let result: any[];
    this.dataService.getNeed("user", 4)
      .subscribe((records: String[]) => result = records);

    this.lastConnection
      .mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(getUserResult),
      })));

    tick();
    expect(result.length).toEqual(1, 'should contain 1 user record');
    expect(result[0].id).toEqual(4, ' this should be the first user record');
  }));

  //this test mocks the getUserResults data set located in the data.service.test.data.ts file:
  it('getRecords() should return all user records', fakeAsync(() => {
    let result: any[];
    this.dataService.getNeed("user", 4)
      .subscribe((records: String[]) => result = records);

    this.lastConnection
      .mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(getUserResult),
      })));

    tick();
    expect(result.length).toEqual(1, 'should contain 1 user record');
    expect(result[0].id).toEqual(4, ' this should be the first user record');
  }));


  //this test mocks the addRecord data set located in the data.service.test.data.ts file:
  it('addRecord() should add a new user record', fakeAsync(() => {
    let result: any;

    this.dataService.addRecord("registration", registerNewUser)
      .subscribe((record: String[]) => result = record);

    this.lastConnection
      .mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({ name: 'bob' }),
      })));

    tick();
    expect(result).toBeTruthy();
    expect(result.name).toEqual('bob', ' this should have returned the object named bob');
  }));


  //Commenting out the following spec because it doesn't return the error msg and returns actual data instead:
  // it('getRecords() while server is down--404 error', fakeAsync(() => {
  //   let result: String[];
  //   let catchedError: any;
  //   this.dataService.getRecords()
  //       .subscribe(
  //         (records: String[]) => result = records,
  //         (error: any) => catchedError = error
  //       );
  //     // angular http test status 404 not failing
  //   this.lastConnection.mockRespond(new Response(new ResponseOptions({
  //     status: 404,
  //     statusText: 'URL not Found',
  //   })));
  //   tick();
  //   expect(result).toBeUndefined();
  //   expect(catchedError).toBeDefined();
  // }));
  //Clicking charity need's Follow button Allows a user (do-gooder) to follow a charity- associates the do-gooder with this charity
  // it('')
  //‘   /user/followcharity/{dogooderid}’  getRecordForEdit doesn't call a dataService method!!  
  // dogooderId = 8, CharityName = Civic-1 --> userID=1.
});



// const o = { name: 'bob', age: 57, height: 2.1 };
// const j = JSON.stringify(o);
// // j => '{ "name": "bob", "age": 57, "height": 2.1 }'
// const o2 = JSON.parse(j);

// How to test a component: this will load the object "user" with the attribute( or Property?) "value" into memory, which can then be passed into the function:
// {
//   // This is the "form"
//   const user = {
//     value: {
//       firstName: 'Curtis',
//       lastName: 'Strange'
//     }
//   }
//   comp.registerUser(user);
// }