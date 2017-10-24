import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';     //By lets you query the html properties

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let element: string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();


  })

  function imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true);};
    img.onerror = function() { callback(false); };
    img.src = url;

  }

  it('should display the title of \'LOCAL HOPE\'', () => {
    debugElement = fixture.debugElement.query(By.css('#test1'));   //12:04 in the video
    htmlElement = debugElement.nativeElement;
    //Assert that the text on screen is "Number: 1"
    expect(htmlElement.textContent).toEqual('LOCAL HOPE');
    // console.log("test #2 counter value is " + htmlElement.textContent)
 })

  it('should display the section titled, \'Donate Time\'', () => {
    debugElement = fixture.debugElement.query(By.css('#test2'));   //12:04 in the video
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual(' Donate Time ');
  })

  it('should display the section titled, Donate Items', () => {
    debugElement = fixture.debugElement.query(By.css('#test3'));   //12:04 in the video
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual(' Donate Items ');
  })


  it('should display the section titled, Donate Money', () => {
    debugElement = fixture.debugElement.query(By.css('#test4'));   //12:04 in the video
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual(' Donate Money ');
  })


  it('should validate a valid image path for image1' ,() => {
    var imageUrl = document.getElementById("image1").getAttribute("src")
    imageExists(imageUrl, function(exists) {
      expect(exists).toBeTruthy(true);
      console.log(exists)
    });
  })

  it('should validate a valid image path for image2' ,() => {
    var imageUrl = document.getElementById("image2").getAttribute("src")
    imageExists(imageUrl, function(exists) {
      expect(exists).toBeTruthy(true);
      console.log(exists)
    });
  })

  it('should validate a valid image path for image3' ,() => {
    var imageUrl = document.getElementById("image3").getAttribute("src")
    imageExists(imageUrl, function(exists) {
      expect(exists).toBeTruthy(true);
      console.log(exists)
    });
  })
  //This code below is here as an example of Arrange/At/Assert format:
//   it('should decrement the counter number by 1', () => {
//     //Arrange:
//     const initialValue = component.counter;

//     //Act:
//     component.decrement();
//     fixture.detectChanges();
//     const newValue = component.counter;

//     //Assert:
//     expect(newValue).toBeLessThan(initialValue);
//     // console.log("test #3 counter value is " + newValue)
//   })


});