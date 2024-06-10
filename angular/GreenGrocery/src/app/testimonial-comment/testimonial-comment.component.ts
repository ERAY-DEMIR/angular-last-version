import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-testimonial-comment',
  templateUrl: './testimonial-comment.component.html',
  styleUrls: ['./testimonial-comment.component.css']
})
export class TestimonialCommentComponent {
  // Assuming rating is a numeric value that you want to display or use
  rating: number;

  // EventEmitter for the onRated event that you might want to emit from this component
  @Output() onRated = new EventEmitter<number>();
$number!: number;

  constructor() {
    // Initialize rating if necessary
    this.rating = 0; // default value or fetch from a service if needed
  }

  // Example method that changes the rating and emits an event
  changeRating(newRating: number): void {
    this.rating = newRating;
    this.onRated.emit(this.rating);
  }
}
