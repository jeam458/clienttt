import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepaqueteComponent } from './detallepaquete.component';

describe('DetallepaqueteComponent', () => {
  let component: DetallepaqueteComponent;
  let fixture: ComponentFixture<DetallepaqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallepaqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallepaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
