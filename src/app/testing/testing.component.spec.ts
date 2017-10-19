// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { TestingComponent } from './testing.component';

// describe('TestingComponent', () => {
//   let component: TestingComponent;
//   let fixture: ComponentFixture<TestingComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ TestingComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestingComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

//commented out all the default code above in order to  write my own below, along with the video lesson:

describe('TestComponent', () => {   //describe, a function that take the description of the suite we are testing and the specDefinitions function as parameters!
  it('True should be true', () => { //it, a function that takes an assertion and "expectations" as parameters
    expect(true).toBe(true);    //assertion!!!
  } )    

})

// 2nd trial at writing a test: it works!
// describe('TestingComponent', () => {
//   it('True should be true', () => {
//     expect(true).toBe(true);
//   })
// })
