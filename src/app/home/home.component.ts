import { Component, OnInit } from '@angular/core';
import { IReview, ReviewsService } from './reviews.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  reviews?: IReview[];

  constructor(private reviewsService: ReviewsService) {}

  async ngOnInit() {
    const reviews = await this.reviewsService.getReviews();
    reviews.sort(() => Math.random() - 0.5);
    this.reviews = reviews;
  }
}
