import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperExhibitComponent } from './paper-exhibit.component';

describe('PaperExhibitComponent', () => {
  let component: PaperExhibitComponent;
  let fixture: ComponentFixture<PaperExhibitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperExhibitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperExhibitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
