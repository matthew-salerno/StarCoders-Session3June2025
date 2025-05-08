import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-critic-score',
    templateUrl: './critic-score.component.html',
    styleUrls: ['./critic-score.component.css'],
    imports: [NgIf, FormsModule]
})
export class CriticScoreComponent implements OnInit, OnChanges {
  // this value is passed in from the parent component - AppComponent in app.component.ts
  @Input() criticScore!: string;

  // we are setting default values here, but notice the user can change these values by
  // entering a different score and by searching a movie
  public minPreferredScore: number = 0.0;
  public isGoodScore: boolean = true;

  constructor() {}

  ngOnInit() {}

  // anytime the Input is changed, this function is called automatically! Thanks Angular!
  ngOnChanges() {
    this.checkScores();
  }

  // this function checks to make sure the movie we searched has a good enough critic score for us
  checkScores() {
    const currentScore = parseFloat(this.criticScore);

    if (currentScore >= this.minPreferredScore) {
      this.isGoodScore = true;
    } else {
      this.isGoodScore = false;
    }

    // when you preview the application, hit F12 to open the developer tools and see these console messages
    console.log('Good Critic Score? : ' + this.isGoodScore);
  }
}
