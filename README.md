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
  
  1. Look at `critic-score.component.ts`, `checkScores` function. The comparison should be `<=`  
      ```diff
       // this function checks to make sure the movie we searched has a good enough critic score for us
       checkScores(score: number | undefined, minScore: number): boolean | null {
         if (score === undefined) {
           return null;
         }
      -  return (score >= minScore);
      +  return (score <= minScore);
       }
      ```
  2. Change `critic-score.component.html` to say "Choose a Maximum Critic Score"  
      ```diff
       <div>
         <fa-icon 
           *ngIf="result()"
           [ngStyle]="{'margin-right': '1rem', 'color': iconColor()}"
           [icon]="iconStyle()"
           [title]="`Score: ${result()?.metascore?.toFixed(2)}`"
         />
      -   <label for="minPreferredScore">Choose a Minimum Critic Score: </label>
      +   <label for="minPreferredScore">Choose a Maximum Critic Score: </label>
         <input type="number" id="minPreferredScore" [(ngModel)]="minPreferredScore" min="0.0" max="100.0" maxLength="5"/>
       </div>
      ```

</details>
  

### 2. Genre
Change the second criteria to have an option for "Documentary"
<details>
  <summary>Solution</summary>

  Look at `genre.component.html`. Add an additional input and label similar to how other genres are implemented.  
  ```diff
       <input type="radio" name="preferredGenre" value="Drama" id="dramaOption" [(ngModel)]="preferredGenre">
       <label for="dramaOption">
         Drama
       </label> 
  +     <input type="radio" name="preferredGenre" value="Documentary" id="documentaryOption" [(ngModel)]="preferredGenre">
  +     <label for="dcumentaryOption">
  +       Documentary
  +     </label> 
     </div>
   </div>
  ```

</details>


### 3. MPAA Rating
Change the third criteria to "Choose a Minimum Rating"
<details>
  <summary>Solution</summary>
  
  1. Look at `mpaa-rating.component.ts`, in the `checkRating` function, you can reverse the comparison.
      ```diff
       // this function checks to make sure the movie we searched has an appropriate rating for us
       checkRating(rating: Rating, maxRating: MpaaRating): boolean | null {
         if (isUnrated(rating)) {
           return null;
         }
      -   else if (compareMpaaRatings(maxRating, rating) >= 0) {
      +   else if (compareMpaaRatings(maxRating, rating) <= 0) {
           return true;
         }
         return false;
       }
      ```
  2. Change `mpaa-rating.component.html` to say "Choose a Minimum Rating"  
      ```diff
       <div>
         <fa-icon 
           *ngIf="result()"
           [ngStyle]="{'margin-right': '1rem', 'color': iconColor()}"
           [title]="`Rated ${result()?.rated}`"
         />
      -  <span>Choose a Maximum Rating: </span>
      +  <span>Choose a Minimum Rating: </span>
         <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" [(ngModel)]="preferredMaxRating">
           <option *ngFor="let option of AVAILABLE_RATINGS" value="{{option}}">{{option}}</option>
         </select>
       </div>
      ```

</details>

### Bonus
Change the genre criteria to be multiselect. Do not use "Any" as an option.
<details>
<summary>Solution</summary>

The cleanest solution would involve rearchitecting a bit more of the application than we'd like to, most likely with
reactive forms. Instead, we'll create one model to contain the options for all the checkboxes:  
1. Remove the 'All' checkbox.
    ```diff
     <div style="margin-left: 2rem"> 
    -  <input type="radio" name="preferredGenre" id="all" value="All" [(ngModel)]="preferredGenre">
    -  <label for="all">
    -    Any
    -  </label>
       <input type="radio" name="preferredGenre" value="Action" id="actionOption" [(ngModel)]="preferredGenre">
       <label for="actionOption">
         Action
       </label>
       <input type="radio" name="preferredGenre" value="Comedy" id="comedyOption" [(ngModel)]="preferredGenre">
       <label for="comedyOption">
         Comedy
       </label>
       <input type="radio" name="preferredGenre" value="Drama" id="dramaOption" [(ngModel)]="preferredGenre">
       <label for="dramaOption">
         Drama
       </label> 
     </div>
    ```
2. Change the input type to `checkbox`
    ```diff
     <div style="margin-left: 2rem"> 
    -  <input type="radio" name="preferredGenre" value="Action" id="actionOption" [(ngModel)]="preferredGenre">
    +  <input type="checkbox" name="preferredGenre" value="Action" id="actionOption" [(ngModel)]="preferredGenre">
       <label for="actionOption">
         Action
       </label>
    -  <input type="radio" name="preferredGenre" value="Comedy" id="comedyOption" [(ngModel)]="preferredGenre">
    +  <input type="checkbox" name="preferredGenre" value="Comedy" id="comedyOption" [(ngModel)]="preferredGenre">
       <label for="comedyOption">
         Comedy
       </label>
    -  <input type="radio" name="preferredGenre" value="Drama" id="dramaOption" [(ngModel)]="preferredGenre">
    +  <input type="checkbox" name="preferredGenre" value="Drama" id="dramaOption" [(ngModel)]="preferredGenre">
       <label for="dramaOption">
         Drama
       </label> 
     </div>
    ```
3. Replace `preferredGenre` with `${genre}Preferred`, we'll make setters and getters for these next.
    ```diff
     <div style="margin-left: 2rem"> 
    -  <input type="checkbox" name="preferredGenre" value="Action" id="actionOption" [(ngModel)]="preferredGenre">
    +  <input type="checkbox" value="Action" id="actionOption" [(ngModel)]="actionPreferred">
       <label for="actionOption">
         Action
       </label>
    -  <input type="checkbox" name="preferredGenre" value="Comedy" id="comedyOption" [(ngModel)]="preferredGenre">
    +  <input type="checkbox" value="Comedy" id="comedyOption" [(ngModel)]="comedyPreferred">
       <label for="comedyOption">
         Comedy
       </label>
    -  <input type="checkbox" name="preferredGenre" value="Drama" id="dramaOption" [(ngModel)]="preferredGenre">
    +  <input type="checkbox" value="Drama" id="dramaOption" [(ngModel)]="dramaPreferred">
       <label for="dramaOption">
         Drama
       </label> 
     </div>
    ```
3. Make setters that update the model when set:
    ```diff
      export class GenreComponent {
        // this value is passed in from the parent component - AppComponent in app.component.ts
        public result = input<OmdbResultDetails>();
        public goodGenreChanged = output<boolean | null>({
          alias: 'good-genre-changed',
        });
  
    -   protected preferredGenre = model<string>('All');
    +   protected preferredGenres = model<Record<string, boolean>>({
    +     action: false,
    +     comedy: false,
    +     drama: false,
    +   });
    +   protected set actionPreferred(action: boolean) {
    +     this.preferredGenres.update((old) => {return {...old, action}});
    +   }
    +   protected set comedyPreferred(comedy: boolean) {
    +     this.preferredGenres.update((old) => {return {...old, comedy}});
    +   }
    +   protected set dramaPreferred(drama: boolean) {
    +     this.preferredGenres.update((old) => {return {...old, drama}});
    +   }
  
        protected isGoodGenre = computed(() => {
          const genres = this.result()?.genres;
          const preferredGenre = this.preferredGenre();
  
          return this.checkGenre(genres, preferredGenre);
        });
    ```
4. Make getters that return the value from the model:
    ```diff
     export class GenreComponent {
       // this value is passed in from the parent component - AppComponent in app.component.ts
       public result = input<OmdbResultDetails>();
       public goodGenreChanged = output<boolean | null>({
         alias: 'good-genre-changed',
       });
 
       protected preferredGenres = model<Record<string, boolean>>({
         action: false,
         comedy: false,
         drama: false,
       });
       protected set actionPreferred(action: boolean) {
         this.preferredGenres.update((old) => {return {...old, action}});
       }
    +  protected get actionPreferred() {
    +    return this.preferredGenres()['action'];
    +  }
       protected set comedyPreferred(comedy: boolean) {
         this.preferredGenres.update((old) => {return {...old, comedy}});
       }
    +  protected get comedyPreferred() {
    +    return this.preferredGenres()['comedy'];
    +  }
       protected set dramaPreferred(drama: boolean) {
         this.preferredGenres.update((old) => {return {...old, drama}});
       }
    +  protected get dramaPreferred() {
    +    return this.preferredGenres()['drama'];
    +  }
 
       protected isGoodGenre = computed(() => {
         const genres = this.result()?.genres;
         const preferredGenre = this.preferredGenre();
 
         return this.checkGenre(genres, preferredGenre);
       });
    ```
5. update the `isGoodGenre` signal computation:
    ```diff
     protected isGoodGenre = computed(() => {
      const genres = this.result()?.genres;
    - const preferredGenre = this.preferredGenre();
    + const preferredGenres = this.preferredGenres();
    - return this.checkGenre(genres, preferredGenre);
    + return this.checkGenres(genres, preferredGenres);
     });
    ```
6. update the `checkGenre` function:
    ```diff
     // this function checks to make sure our movie is the same genre as the one we want to watch
    -checkGenre(genres: string[] | undefined, preferredGenre: string): boolean | null {
    +checkGenres(genres: string[] | undefined, preferredGenres: Record<string, boolean>): boolean | null {
       if (genres === undefined || genres.length === 0) {
         return null;
       }
    -  return preferredGenre === 'All' || genres.includes(preferredGenre);
    +  let preferredGenresSet = new Set<string>();
    +  for (let key in preferredGenres) {
    +    if (preferredGenres[key] === true) {
    +      preferredGenresSet.add(key);
    +    }
    +  }
    +  if (preferredGenresSet.size === 0) {
    +    return true;
    +  }
    +  for (let genre of genres) {
    +    if (preferredGenresSet.has(genre.toLowerCase())) {
    +      return true;
    +    }
    +  }
    +  return false;
     }
    ```

</details>