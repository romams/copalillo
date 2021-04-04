import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureModalComponent } from './procedure-modal.component';

describe('ProcedureModalComponent', () => {
  let component: ProcedureModalComponent;
  let fixture: ComponentFixture<ProcedureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
