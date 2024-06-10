import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialComponent } from './testimonials.component';

describe('TestimonialsComponent', () => {
  let component: TestimonialComponent;
  let fixture: ComponentFixture<TestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
