import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private API_KEY = '540d48e8';
  private API_URL = 'https://www.omdbapi.com/';

  constructor(private httpClient: HttpClient) {}

  public retrieveMovieData(title: string): Observable<any> {
    const headers = this.getHeaders();
    const params = this.getParams(title);

    const options = {
      headers: headers,
      params: params
    };

    return this.httpClient.get(this.API_URL, options);
  }

  public parseCriticScores(scores: any[]): string {
    const num_of_ratings = scores.length;
    let final_score = 0.0;

    for (const score of scores) {
      const source = score['Source'];
      let value = score['Value'];

      let score_value = 0.0;

      if (source == 'Internet Movie Database') {
        value = parseFloat(value.split('/')[0]);
        score_value = value * 10;
      } else if (source == 'Rotten Tomatoes') {
        score_value = parseFloat(value.split('%')[0]);
      } else if (source == 'Metacritic') {
        score_value = parseFloat(value.split('/')[0]);
      }
      final_score += Math.round(score_value / num_of_ratings);
    }

    return final_score.toFixed(1);
  }

  private getHeaders() {
    const headers = new HttpHeaders({
      Accept: 'application/json'
    });

    return headers;
  }

  private getParams(title: string) {
    const params = new HttpParams()
      .set('t', title)
      .set('y', '*')
      .set('apiKey', this.API_KEY);

    return params;
  }
}
