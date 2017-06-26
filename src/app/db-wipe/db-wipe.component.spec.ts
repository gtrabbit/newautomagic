import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbWipeComponent } from './db-wipe.component';

describe('DbWipeComponent', () => {
  let component: DbWipeComponent;
  let fixture: ComponentFixture<DbWipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbWipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbWipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
