import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCitedComponent } from './top-cited.component';

describe('TopCitedComponent', () => {
  let component: TopCitedComponent;
  let fixture: ComponentFixture<TopCitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCitedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
