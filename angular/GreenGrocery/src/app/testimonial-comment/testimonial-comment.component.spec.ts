import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialCommentComponent } from './testimonial-comment.component';

describe('TestimonialCommentComponent', () => {
  let component: TestimonialCommentComponent;
  let fixture: ComponentFixture<TestimonialCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonialCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonialCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
