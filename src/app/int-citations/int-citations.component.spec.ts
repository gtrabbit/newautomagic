import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntCitationsComponent } from './int-citations.component';

describe('IntCitationsComponent', () => {
  let component: IntCitationsComponent;
  let fixture: ComponentFixture<IntCitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntCitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntCitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
