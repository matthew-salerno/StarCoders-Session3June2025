import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OmdbResultDetails } from '../types/omdb';

@Component({
    selector: 'app-genre',
    templateUrl: './genre.component.html',
    styleUrls: ['./genre.component.css'],
    imports: [FormsModule]
})
export class GenreComponent {
  // this value is passed in from the parent component - AppComponent in app.component.ts
  public result = input<OmdbResultDetails>();
  public goodGenreChanged = output<boolean | null>({
    alias: 'good-genre-changed',
  });

  protected preferredGenreForm: string = 'All';
  private preferredGenre = signal<string>(this.preferredGenreForm);
  protected isGoodGenre = computed(() => {
    const genres = this.result()?.genres;
    const preferredGenre = this.preferredGenre();

    return this.checkGenre(genres, preferredGenre);
  });

  constructor() {
    effect(() => {
      this.goodGenreChanged.emit(this.isGoodGenre());
    });
  }

  // anytime the Input is changed, this function is called automatically! Thanks Angular!
  onPreferredGenreChange() {
    this.preferredGenre.set(this.preferredGenreForm);
  }

  // this function checks to make sure our movie is the same genre as the one we want to watch
  checkGenre(genres: string[] | undefined, preferredGenre: string): boolean | null {
    if (genres === undefined || genres.length === 0) {
      return null;
    }
    return preferredGenre === 'All' || genres.includes(preferredGenre);
  }
}
