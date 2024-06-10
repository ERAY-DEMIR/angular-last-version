import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingPolicyComponent } from './ordering-policy.component';

describe('OrderingPolicyComponent', () => {
  let component: OrderingPolicyComponent;
  let fixture: ComponentFixture<OrderingPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderingPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
