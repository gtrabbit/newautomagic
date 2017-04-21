import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIFLinkComponent } from './add-iflink.component';

describe('AddIFLinkComponent', () => {
  let component: AddIFLinkComponent;
  let fixture: ComponentFixture<AddIFLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIFLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIFLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
