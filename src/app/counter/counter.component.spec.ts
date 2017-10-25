import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';     //By lets you query the html properties

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css('p'));   //12:04 in the video
    htmlElement = debugElement.nativeElement;
  })

  it('should increment the counter number by 1', () => {
    //Arrange:
    const initialValue = component.counter;

    //Act:
    component.increment();
    fixture.detectChanges();
    const newValue = component.counter;
    // console.log("test #1 counter value is " + newValue)

    //Assert:
    expect(newValue).toBeGreaterThan(initialValue);
  })

  it('should display the current number of the counter', () => {
    //Assert that the text on screen is "Number: 1"
    expect(htmlElement.textContent).toEqual('Number: 1');
    // console.log("test #2 counter value is " + htmlElement.textContent)
 })

  it('should decrement the counter number by 1', () => {
    //Arrange:
    const initialValue = component.counter;

    //Act:
    component.decrement();
    fixture.detectChanges();
    const newValue = component.counter;

    //Assert:
    expect(newValue).toBeLessThan(initialValue);
    // console.log("test #3 counter value is " + newValue)
  })


});
