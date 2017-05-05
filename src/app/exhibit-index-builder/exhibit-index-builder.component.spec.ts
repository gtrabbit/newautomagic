import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitIndexBuilderComponent } from './exhibit-index-builder.component';

describe('ExhibitIndexBuilderComponent', () => {
  let component: ExhibitIndexBuilderComponent;
  let fixture: ComponentFixture<ExhibitIndexBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitIndexBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitIndexBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
