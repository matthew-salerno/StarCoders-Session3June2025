import { Component, computed, signal } from '@angular/core';
import { OmdbApiService } from './omdb-api.service';
import { CriticScoreComponent } from './critic-score/critic-score.component';
import { GenreComponent } from './genre/genre.component';
import { MpaaRatingComponent } from './mpaa-rating/mpaa-rating.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MovieResultComponent } from "./movie-result/movie-result.component";
import { MovieSearchComponent } from "./movie-search/movie-search.component";
import { OmdbResultDetails,OmdbSearchResult } from './types/omdb';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CriticScoreComponent, GenreComponent, MpaaRatingComponent, FormsModule, MovieResultComponent, MovieSearchComponent]
})
export class AppComponent {
  protected omdbResult = signal<OmdbResultDetails | undefined>(undefined);
  private isGoodScore = signal<boolean | null>(null);
  private isGoodRating = signal<boolean | null>(null);
  private isGoodGenre = signal<boolean | null>(null);
  protected shouldWatch = computed(() =>
    (this.omdbResult() ?? null) && this.isGoodGenre() && this.isGoodRating() && this.isGoodScore() 
  );


  onResultChanged($event: OmdbResultDetails) {
    this.omdbResult.set($event);
  }
  onGoodScoreChanged($event: boolean | null) {
    this.isGoodScore.set($event);
  }
  onGoodRatingChanged($event: boolean | null) {
    this.isGoodRating.set($event);
  }
  onGoodGenreChanged($event: boolean | null) {
    this.isGoodGenre.set($event);
  }
}
