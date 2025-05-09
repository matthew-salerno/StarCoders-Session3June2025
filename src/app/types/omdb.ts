export const POSSIBLE_MPAA_RATINGS = [
  'G',
  'PG',
  'PG-13',
  'R',
  'NC-17'
] as const;

export type MpaaRating = typeof POSSIBLE_MPAA_RATINGS[number];
export type Unrated = 'NR' | 'UR';
export type Rating = MpaaRating | Unrated;

export function isRating(rating: string): rating is Rating {
  return isMpaaRated(rating) || isUnrated(rating);
}

export function isUnrated(rating: string): rating is Unrated {
  return rating === 'NR' || rating === 'UR';
}

export function isMpaaRated(rating: string): rating is MpaaRating {
  return (POSSIBLE_MPAA_RATINGS as readonly string[]).includes(rating);
}

export function compareMpaaRatings(a: MpaaRating, b: MpaaRating): number {
  return POSSIBLE_MPAA_RATINGS.indexOf(a) - POSSIBLE_MPAA_RATINGS.indexOf(b);
}

export type OmdbEntryType = 'movie' | 'series' | 'episode'; 

export type OmdbLookup = (
  {imdbId: string} |
  {title: string}
) & {
  type?: OmdbEntryType;
  /** positive integer */
  year?: number;
  plot?: 'short' | 'full';
  return?: 'json' | 'xml';
}

function isOmdbLookup(lookup: OmdbSearch | OmdbLookup): lookup is OmdbLookup {
  return ('imdbId' in lookup || 'title' in lookup) && !('search' in lookup);
}


export interface OmdbSearch {
  search: string;
  type?: OmdbEntryType;
  /** positive integer */
  year?: number;
  return?: 'json' | 'xml';
  /** positive integer */
  page?: number;
}

function isOmdbSearch(search: OmdbSearch | OmdbLookup): search is OmdbSearch {
  return !('imdbId' in search || 'title' in search) && ('search' in search);
}

export interface OmdbResultDetails {
  title: string;
  year: string;
  rated: Rating;
  released: string;
  runtime: string;
  genres: string[];
  directors: string[];
  writers: string[];
  actors: string[];
  plot: string;
  languages: string[];
  countries: string[];
  awards: string;
  poster?: string;
  ratings: CriticScore[];
  metascore: number;
  imdbRating: number;
  imdbVotes: number;
  imdbId: string;
  type: OmdbEntryType;
  dvd: string;
  boxOffice: string;
  production: string;
  website: string;
}

export interface OmdbSearchResult {
  title: string;
  imdbId: string;
  type: OmdbEntryType;
  poster?: string;
}

export interface OmdbLookupRequest {
  i?: string;
  t?: string;
  type?: OmdbEntryType;
  y?: string;
  plot?: 'short' | 'full';
  r?: 'json' | 'xml';
  v: '1';
}

export interface OmdbSearchRequest {
  s: string;
  type?: OmdbEntryType;
  y?: string;
  r?: 'json' | 'xml';
  page?: string;
  v: '1';
}

export interface OmdbSearchResponse {
  Search: Array<{
    Title: string;
    imdbID: string;
    Type: OmdbEntryType;
    Poster?: string;
  }>;
  totalResults: string;
  Response: "True";
}

export interface OmdbLookupResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster?: string;
  Ratings: CriticScore[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: OmdbEntryType;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: "True";
}

function isOmdbLookupResponse(response: OmdbLookupResponse | OmdbErrorResponse | OmdbSearchResponse): response is OmdbLookupResponse {
  return response.Response === "True" && !('totalResults' in response);
}
function isOmdbSearchResponse(response: OmdbLookupResponse | OmdbErrorResponse | OmdbSearchResponse): response is OmdbSearchResponse {
  return response.Response === "True" && ('totalResults' in response);
}
function isOmdbErrorResponse(response: OmdbLookupResponse | OmdbErrorResponse | OmdbSearchResponse): response is OmdbErrorResponse {
  return response.Response === "False";
}

export interface OmdbErrorResponse {
  Response: "False";
  Error: string;
}

export interface CriticScore {
  Source: "Rotten Tomatoes" | "Internet Movie Database" | "Metacritic";
  Value: string;
} 

export function makeOmdbRequest(request: OmdbLookup): OmdbLookupRequest;
export function makeOmdbRequest(request: OmdbSearch): OmdbSearchRequest;
export function makeOmdbRequest(request: OmdbSearch | OmdbLookup): OmdbSearchRequest | OmdbLookupRequest;
export function makeOmdbRequest(request: OmdbSearch | OmdbLookup): OmdbSearchRequest | OmdbLookupRequest {
  if (isOmdbLookup(request)) {
    return makeOmdbLookupRequest(request);
  } else if (isOmdbSearch(request)) {
    return makeOmdbSearchRequest(request);
  }
  request satisfies never;
  throw new Error("Unreachable");
}

function makeOmdbSearchRequest(omdbSearch: OmdbSearch): OmdbSearchRequest {
  return {
    s: omdbSearch.search,
    type: omdbSearch.type,
    y: omdbSearch.year ? omdbSearch.year.toFixed(0) : undefined,
    r: omdbSearch.return,
    page: omdbSearch.page ? omdbSearch.page.toFixed(0) : undefined,
    v: '1',
  }
}

function makeOmdbLookupRequest(omdbLookup: OmdbLookup): OmdbLookupRequest {
  return {
    i: 'imdbId' in omdbLookup ? omdbLookup.imdbId : undefined,
    t: 'title' in omdbLookup ? omdbLookup.title : undefined,
    type: omdbLookup.type,
    y: omdbLookup.year ? omdbLookup.year.toFixed(0) : undefined,
    plot: omdbLookup.plot,
    r: omdbLookup.return,
    v: '1',
  }
}

export function convertOmdbResponse(response: OmdbSearchResponse): OmdbSearchResult[];
export function convertOmdbResponse(response: OmdbLookupResponse): OmdbResultDetails;
export function convertOmdbResponse(response: OmdbLookupResponse | OmdbSearchResponse | OmdbErrorResponse): OmdbResultDetails | OmdbSearchResult[];
export function convertOmdbResponse(response: OmdbLookupResponse | OmdbSearchResponse | OmdbErrorResponse): OmdbResultDetails | OmdbSearchResult[] {
  if (isOmdbErrorResponse(response)) {
    throw new Error(response.Error);
  }
  else if (isOmdbLookupResponse(response)) {
    return convertOmdbLookupResponse(response);
  }
  else if (isOmdbSearchResponse(response)) {
    return convertOmdbSearchResponse(response);
  }
  else {
    response satisfies never;
    throw new Error("Unreachable");
  }
}


export function convertOmdbSearchResponse(response: OmdbSearchResponse): OmdbSearchResult[] {
  return response.Search.map((result) => {
    return {
      title: result.Title,
      imdbId: result.imdbID,
      type: result.Type,
      poster: result.Poster,
    };
  })
}

export function convertOmdbLookupResponse(response: OmdbLookupResponse): OmdbResultDetails {
  return {
    title: response.Title,
    year: response.Year,
    rated: isRating(response.Rated) ? response.Rated : 'NR', // assume not rated if not a rating
    released: response.Released,
    runtime: response.Runtime,
    genres: response.Genre.split(',').map((genre) => genre.trim()),
    directors: response.Director.split(',').map((director) => director.trim()),
    writers: response.Writer.split(',').map((writer) => writer.trim()),
    actors: response.Actors.split(',').map((actor) => actor.trim()),
    plot: response.Plot,
    languages: response.Language.split(',').map((language) => language.trim()),
    countries: response.Country.split(',').map((country) => country.trim()),
    awards: response.Awards,
    poster: response.Poster,
    ratings: response.Ratings,
    metascore: parseFloat(response.Metascore),
    imdbRating: parseFloat(response.imdbRating),
    imdbVotes: parseInt(response.imdbVotes),
    imdbId: response.imdbID,
    type: response.Type,
    dvd: response.DVD,
    boxOffice: response.BoxOffice,
    production: response.Production,
    website: response.Website,
  };
}