import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLinksComponent } from './display-links.component';

describe('DisplayLinksComponent', () => {
  let component: DisplayLinksComponent;
  let fixture: ComponentFixture<DisplayLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
