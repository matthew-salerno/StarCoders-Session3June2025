import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-genre',
    templateUrl: './genre.component.html',
    styleUrls: ['./genre.component.css'],
    imports: [NgIf, FormsModule]
})
export class GenreComponent implements OnInit, OnChanges {
  // this value is passed in from the parent component - AppComponent in app.component.ts
  @Input() movieGenres!: string[];

  public preferredGenre: string;
  public isGoodGenre!: boolean;

  constructor() {
    // you can set defaults in the constructor
    // users change this value by selecting a different genre on the screen.
    this.preferredGenre = 'All';
  }

  ngOnInit() {}

  // anytime the Input is changed, this function is called automatically! Thanks Angular!
  ngOnChanges() {
    this.checkGenre();
  }

  // this function checks to make sure our movie is the same genre as the one we want to watch
  checkGenre() {
    if (
      this.movieGenres.length > 0 &&
      this.movieGenres.indexOf(this.preferredGenre) > -1
    ) {
      this.isGoodGenre = true;
    } else if (this.movieGenres.length == 0 || this.preferredGenre == 'All') {
      this.isGoodGenre = true;
    } else {
      this.isGoodGenre = false;
    }

    // when you preview the application, hit F12 to open the developer tools and see these console messages
    console.log('Good Genre? : ' + this.isGoodGenre);
  }
}
