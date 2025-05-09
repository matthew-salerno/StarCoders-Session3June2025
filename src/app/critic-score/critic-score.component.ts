import { Component, Signal, computed, effect, input, output, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OmdbResultDetails } from '../types/omdb';

@Component({
    selector: 'app-critic-score',
    templateUrl: './critic-score.component.html',
    styleUrls: ['./critic-score.component.css'],
    imports: [NgIf, FormsModule]
})
export class CriticScoreComponent {
  // this value is passed in from the parent component - AppComponent in app.component.ts
  public result = input<OmdbResultDetails>();
  public goodScoreChanged = output<boolean | null>({
    alias: 'good-score-changed',
  });
  protected minPreferredScoreForm: number = 0.0;
  private minPreferredScore = signal<number>(this.minPreferredScoreForm);

  // is good score is "computed" every time a contained signal is changed
  protected isGoodScore: Signal<boolean | null> = computed(() => {
      // good practice to put all your signals up front
      const score = this.result()?.metascore;
      const minScore = this.minPreferredScore();
      return this.checkScores(score, minScore);
    }
  );

  constructor() {
    // gets called whenever a contained signal (isGoodScore) changes
    effect(() => {
      this.goodScoreChanged.emit(this.isGoodScore());
    });
  }

  onPreferredScoreChange() {
    this.minPreferredScore.set(this.minPreferredScoreForm);
  }

  // this function checks to make sure the movie we searched has a good enough critic score for us
  checkScores(score: number | undefined, minScore: number): boolean | null {
    if (score === undefined) {
      return null;
    }
    return (score >= minScore);
  }
}
