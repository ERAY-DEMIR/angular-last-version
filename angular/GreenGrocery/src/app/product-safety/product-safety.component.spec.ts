import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSafetyComponent } from './product-safety.component';

describe('ProductSafetyComponent', () => {
  let component: ProductSafetyComponent;
  let fixture: ComponentFixture<ProductSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSafetyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
