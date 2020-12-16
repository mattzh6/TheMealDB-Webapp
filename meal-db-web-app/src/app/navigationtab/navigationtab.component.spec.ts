import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationtabComponent } from './navigationtab.component';

describe('NavigationtabComponent', () => {
  let component: NavigationtabComponent;
  let fixture: ComponentFixture<NavigationtabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationtabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
