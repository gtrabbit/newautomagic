import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIFComponent } from './add-if.component';

describe('AddIFComponent', () => {
  let component: AddIFComponent;
  let fixture: ComponentFixture<AddIFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
