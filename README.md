# Instructions
## Setup
Introduce the application. Try out the UI, and walk through app.component.html.Understand how the components are connected.

1. Run the app and find an action movies with a critic score above 70 and have a maximum rating of PG-13.
    - Black Panther
    - Inception
    - Godzilla Minus One

2. Display the movie's plot in the search results.
  Look at `movie-result.component.html` (and the `OmdbResultDetails` function in 
  `omdb.ts` for help on variable names).  
  Line 7 add:  
    ```html
    <p>{{this.result()?.plot}}</p>
    ```

3. The icon next to rating is missing! Add a <img alt="check mark" src="assets/circle-check-regular.svg" style="width:1em; height:1em;">  or <img alt="X mark" src="assets/circle-xmark-regular.svg" style="width:1em; height:1em;"> icon left of 
 the rating criteria. 
 Look at `mpaa-rating.component.html`, (and other `component.html` files as reference).  
 Line 5 add:  
    ```html
    [icon]="iconStyle()"
    ```


## Challenges
Explore each component independently! Spend a few minutes working independently, and then discuss with the group. Hints are available by clicking the arrows, but try doing it on your own first.  
### 1. Critic Score
Change the first criteria to "Choose a Maximum Critic Score"
<details>
  <summary>Solution</summary>  
  
  Look at `critic-score.component.ts`, `checkScores` function. Line 63 should be `<=`
  
</details>
  

### 2. Genre
Change the second criteria to have an option for "Documentary"
<details>
  <summary>Solution</summary>

  Look at `genre.component.html`. Add an additional input and label similar to how other genres are implemented.  
    
</details>


### 3. MPAA Rating
Change the third criteria to "Choose a Minimum Rating"
<details>
  <summary>Solution</summary>
  
  Look at `omdb.ts`, `compareMpaaRatings` function. Line 26 switch `a` and `b`.

</details>

### Bonus
Change the genre criteria to be multiselect. Do not use "Any" as an option.