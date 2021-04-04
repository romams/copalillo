import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasModalComponent } from './citas-modal.component';

describe('CitasModalComponent', () => {
  let component: CitasModalComponent;
  let fixture: ComponentFixture<CitasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
