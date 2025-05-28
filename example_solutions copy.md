# Instructions
## Setup
Introduce the application. Try out the UI, and walk through app.component.html.Understand how the components are connected.

1. Run the app and find an action movies with a critic score above 70 and have a maximum rating of PG-13.
    - Black Panther
    - Inception
    - Godzilla Minus One

2. Display the movie's plot in the search results.
  Look at movie-result.component.html (and the OmdbResultDetails function in 
  omdb.ts for help on variable names). Line 7 add 
    ```html
    <p>{{this.result()?.plot}}</p>
    ```

3. The icon next to rating is missing! Add a check or X icon left of 
 to the rating criteria. 
 Look at mpaa-rating.component.html, (and other component.html files as reference). Line 5 add `[icon]="iconStyle()"` .


## Challenges
Explore each component independently! Spend 5 minutes working independently, and then discuss with the group. 
1. <summary>Change the first criteria to "Choose a Maximum Critic Score"
  Look at critic-score.component.ts, checkScores function. Line 63 should be `<=`.

2. Change the second criteria to have an option for "Documentary"
  Look at genre.component.html. Add an additional input and label similar to how other genres are implemented.

3. Change the third criteria to "Choose a Minimum Rating"
  Look at omdb.ts, compareMpaaRatings function. Line 26 switch `a` and `b`.

### Bonus
Change the genre criteria to be multiselect. Do not use "Any" as an option.