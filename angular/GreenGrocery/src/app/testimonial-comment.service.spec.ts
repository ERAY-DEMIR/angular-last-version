import { TestBed } from '@angular/core/testing';
import { TestimonialCommentService } from './testimonial-comment.service';
import { TestimonialComment } from './testimonial-comment.model';

describe('TestimonialCommentService', () => {
  let service: TestimonialCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestimonialCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a testimonial comment', (done: DoneFn) => {
    const testimonial: TestimonialComment = { username: 'testuser', comment: 'Great service!', rating: 5 };
    service.addTestimonial(testimonial).subscribe((addedTestimonial) => {
      expect(addedTestimonial).toEqual(testimonial);
      done();
    });
  });

  it('should get all testimonial comments', (done: DoneFn) => {
    const testimonial1: TestimonialComment = { username: 'testuser1', comment: 'Great service!', rating: 5 };
    const testimonial2: TestimonialComment = { username: 'testuser2', comment: 'Good experience.', rating: 4 };
    service.addTestimonial(testimonial1).subscribe();
    service.addTestimonial(testimonial2).subscribe();
    service.getTestimonials().subscribe((testimonials) => {
      expect(testimonials.length).toBe(2);
      expect(testimonials).toContain(testimonial1);
      expect(testimonials).toContain(testimonial2);
      done();
    });
  });
});
