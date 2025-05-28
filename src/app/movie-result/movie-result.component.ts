import { NgIf } from '@angular/common';
import { Component, computed, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OmdbResultDetails } from '../types/omdb';

@Component({
  selector: 'app-movie-result',
  imports: [NgIf, FormsModule],
  templateUrl: './movie-result.component.html',
  styleUrl: './movie-result.component.css'
})
export class MovieResultComponent {
  shouldWatch = input<boolean | null>(null, {
    alias: "should-watch",
  });
  result = input<OmdbResultDetails>();
  displayResult!: string;
  resultText = computed(() => {
    const shouldWatch = this.shouldWatch();
    if (shouldWatch) {
      return "It's a great movie! You should watch it.";
    }
    else {
      return "This is not the movie for you! Don't watch it.";
    }
  });
}
