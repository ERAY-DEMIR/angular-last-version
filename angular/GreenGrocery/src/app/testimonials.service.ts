import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Testimonials } from './testimonials.model'; // Import Testimonial interface
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  private testimonialsSubject: BehaviorSubject<Testimonials[]> = new BehaviorSubject<Testimonials[]>([]);

  constructor(private translate: TranslateService, private http: HttpClient) { // Fix HttpClient import
    // Subscribe to language change events
    this.translate.onLangChange.subscribe(() => {
      this.updateTestimonials();
    });

    // Initial data load
    this.updateTestimonials();
  }

  getTestimonials(): Observable<Testimonials[]> { // Return Observable<Testimonials[]>
    return this.testimonialsSubject.asObservable();
  }

  private updateTestimonials() {
    const testimonialKeys = [
      'testimonials.testimonial1.username',
      'testimonials.testimonial1.description',
      'testimonials.testimonial2',
      'testimonials.testimonial2.description',
      'testimonials.testimonial3',
      'testimonials.testimonial3.description'
    ];
    // Logic to fetch products from an API or other data source
    this.translate.get(testimonialKeys).subscribe(translations => {
      const testimonials: Testimonials[] = [
        {
          id: 1,
          username: "John Doe",
          description: translations['testimonials.testimonial1.description'],
          imgSrc: 'assets/img/user-icons/male.png',
          text: '',
          rating: 5
        },
        {
          id: 2,
          username: "Jane Doe",
          description: translations['testimonials.testimonial2.description'],
          imgSrc: 'assets/img/user-icons/female.png',
          text: '',
          rating: 5
        },
        {
          id: 3,
          username: "James Doe",
          description: translations['testimonials.testimonial3.description'],
          imgSrc: 'assets/img/user-icons/blank-image.png',
          text: '',
          rating: 5
        },
      ];
      this.testimonialsSubject.next(testimonials);
    });
  }
}
export { Testimonials };

