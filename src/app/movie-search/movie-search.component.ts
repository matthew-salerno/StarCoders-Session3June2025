import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OmdbApiService } from '../omdb-api.service';
import { Subject } from 'rxjs';
import { OmdbResultDetails} from '../types/omdb';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-search',
  imports: [FormsModule],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})
export class MovieSearchComponent {
  protected title = model<string>("");
  private omdbResults$ = new Subject<OmdbResultDetails>();
  public newResult = outputFromObservable(this.omdbResults$, {alias: 'result-changed'});
  constructor(
    private omdbApi: OmdbApiService,
  ) { }

  submitSearch() {
    this.omdbApi.retrieveOmdb({title: this.title()}).subscribe({
      next: (result) => {
        this.omdbResults$.next(result);
      }
    });
  }
}
