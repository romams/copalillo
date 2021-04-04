import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptoModalComponent } from './depto-modal.component';

describe('DeptoModalComponent', () => {
  let component: DeptoModalComponent;
  let fixture: ComponentFixture<DeptoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
