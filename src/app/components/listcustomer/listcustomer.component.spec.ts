import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcustomerComponent } from './listcustomer.component';

describe('ListcustomerComponent', () => {
  let component: ListcustomerComponent;
  let fixture: ComponentFixture<ListcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListcustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
