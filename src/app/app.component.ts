import { Component, computed, model, signal } from '@angular/core';
import { CriticScoreComponent } from './critic-score/critic-score.component';
import { GenreComponent } from './genre/genre.component';
import { MpaaRatingComponent } from './mpaa-rating/mpaa-rating.component';
import { FormsModule } from '@angular/forms';
import { MovieResultComponent } from "./movie-result/movie-result.component";
import { MovieSearchComponent } from "./movie-search/movie-search.component";
import { OmdbResultDetails } from './types/omdb';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CriticScoreComponent, GenreComponent, MpaaRatingComponent, FormsModule, MovieResultComponent, MovieSearchComponent]
})
export class AppComponent {
  protected omdbResult = signal<OmdbResultDetails | undefined>(undefined);
  protected isGoodScore = signal<boolean | null>(null);
  protected isGoodRating = signal<boolean | null>(null);
  protected isGoodGenre = signal<boolean | null>(null);
  protected shouldWatch = computed(() =>
    (this.omdbResult() ?? null) && this.isGoodGenre() && this.isGoodRating() && this.isGoodScore() 
  );
}
