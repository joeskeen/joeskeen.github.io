import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  constructor(private httpClient: HttpClient) {}

  getReviews() {
    return firstValueFrom(
      this.httpClient.get<IReview[]>('assets/reviews.json')
    );
  }
}

export interface IReview {
  reviewer: {
    name: string;
    avatarUrl: string;
  };

  review: string;
}
