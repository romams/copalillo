import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptoComponent } from './depto.component';

describe('DeptoComponent', () => {
  let component: DeptoComponent;
  let fixture: ComponentFixture<DeptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
