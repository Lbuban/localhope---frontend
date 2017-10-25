// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

// import { RegistrationComponent } from './registration.component';

// describe('the registerUser service', () => {    //the first parameter is the test component; the 2nd is a callback fcn that you add tests to
//   let component: RegistrationComponent;
//   let fixture: ComponentFixture<RegistrationComponent>;

//   var registerUser, $window, sandbox;   //2:40, window service is used by Angular; sandbox is used by Sinon to mock data returned.

//   beforeEach(inject(function ([_registerUser_, _$window_]: [any, any]) => {   //3:00, inject is used by Angular mock file to inject svcs and dependencies; Inject the test svc and the $window svc.
//     registerUser = _registerUser_;
//     $window = _$window_;    //store the injected services into the variables created above
// //sandbox = sinon.sandbox.create();   I don't think I need to use this
    
//   it('registers a new user', function() {
//       expect(registerUser)
//     })
//   })) 


            // beforeEach(async(() => {
            //   TestBed.configureTestingModule({
            //     declarations: [ RegistrationComponent ]
            //   })
            //   .compileComponents();
            // }));

            // beforeEach(() => {
            //   fixture = TestBed.createComponent(RegistrationComponent);
            //   component = fixture.componentInstance;
            //   fixture.detectChanges();
            // });

            // it('should create', () => {
            //   expect(component).toBeTruthy();
            // });
// });
