import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { CriticScoreComponent } from './critic-score/critic-score.component';
import { GenreComponent } from './genre/genre.component';
import { MpaaRatingComponent } from './mpaa-rating/mpaa-rating.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CriticScoreComponent, GenreComponent, MpaaRatingComponent, FormsModule, NgIf]
})
export class AppComponent {
  movieTitle: string;
  moviePlot: string;

  // Set Defaults for Criteria
  movieGenre: string[] = [];
  criticRating: string = '100.0';
  mpaaRating: string = '';

  // when this value is true, a message telling the user Watch or Don't Watch is Displayed
  showMessage = false;

  // an error is displayed if the request to the API fails
  errorMessage = '';
  error = false;

  // here we are using something called Dependency Injection! It makes it easy to write readable code.
  constructor(private apiService: ApiService) {
    // you can set default values in the constructor method of the component
    this.movieTitle = '';
    this.moviePlot = '';
  }

  // this function is called when the "Search Movies" button is clicked
  submitSearch() {
    console.log('Form Submitted --> ' + this.movieTitle);

    // reset messages
    this.error = false;
    this.showMessage = false;

    // we are calling the API here and subscribing to the Response
    // this allows to us to wait for the data to return before we do anything with it.
    this.apiService
      .retrieveMovieData(this.movieTitle)
      .subscribe((apiResponse: any) => {
        console.log(apiResponse);
        if (apiResponse['Response'] !== 'False') {
          // if the request is successful, we get the information about the movie
          this.mpaaRating = apiResponse['Rated'];
          this.movieGenre = apiResponse['Genre'].split(', ');
          this.criticRating = this.apiService.parseCriticScores(
            apiResponse['Ratings']
          );
          // and we show the Watch/Don't Watch message
          this.showMessage = true;
        } else {
          // if the request is not successful, we show the error message
          this.error = true;
          this.errorMessage = apiResponse['Error'];
        }
      });
  }
}
