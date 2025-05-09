import { NgIf } from '@angular/common';
import { Component, Input, input } from '@angular/core';
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
}
