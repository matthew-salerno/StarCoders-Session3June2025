import { Component, Signal, computed, effect, input, model, output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { OmdbResultDetails } from '../types/omdb';

@Component({
    selector: 'app-critic-score',
    templateUrl: './critic-score.component.html',
    styleUrls: ['./critic-score.component.css'],
    imports: [NgIf, FormsModule, FontAwesomeModule, CommonModule]
})
export class CriticScoreComponent {
  // this value is passed in from the parent component - AppComponent in app.component.ts
  public result = input<OmdbResultDetails>();
  public goodScoreChanged = output<boolean | null>({
    alias: 'good-score-changed',
  });
  protected minPreferredScore = model<number>(0.0);

  // is good score is "computed" every time a contained signal is changed
  protected isGoodScore: Signal<boolean | null> = computed(() => {
      // good practice to put all your signals up front
      const score = this.result()?.metascore;
      const minScore = this.minPreferredScore();
      return this.checkScores(score, minScore);
    }
  );

  protected iconStyle: Signal<IconDefinition> = computed(() => {
    const isGood = this.isGoodScore();
    if (isGood) {
      return faCheckCircle;
    }
    else {
      return faXmarkCircle;
    }
  });

  protected iconColor: Signal<string> = computed(() => {
    const isGood = this.isGoodScore();
    if (isGood) {
      return 'green';
    }
    else {
      return 'red';
    }
  });

  constructor() {
    // gets called whenever a contained signal (isGoodScore) changes
    effect(() => {
      this.goodScoreChanged.emit(this.isGoodScore());
    });
  }

  // this function checks to make sure the movie we searched has a good enough critic score for us
  checkScores(score: number | undefined, minScore: number): boolean | null {
    if (score === undefined) {
      return null;
    }
    return (score >= minScore);
  }
}
