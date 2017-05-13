import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbfComponent } from './pbf.component';

describe('PbfComponent', () => {
  let component: PbfComponent;
  let fixture: ComponentFixture<PbfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
