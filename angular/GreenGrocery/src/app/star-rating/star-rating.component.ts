import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() maxStars = 5;
  @Input() initialRating = 0;
  @Output() rated = new EventEmitter<number>();

  stars: number[] = [];
  selectedStar = 0;

  constructor() {
      this.stars = Array(this.maxStars).fill(0).map((_, i) => i + 1);
      this.selectedStar = this.initialRating;
  }

  rateStar(star: number) {
      this.selectedStar = star;
      this.rated.emit(star);
  }
}
