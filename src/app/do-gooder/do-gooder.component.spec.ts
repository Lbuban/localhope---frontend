import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoGooderComponent } from './do-gooder.component';

describe('DoGooderComponent', () => {
  let component: DoGooderComponent;
  let fixture: ComponentFixture<DoGooderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoGooderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoGooderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
