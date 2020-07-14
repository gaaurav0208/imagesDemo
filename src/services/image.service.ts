import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imagesURL = 'http://www.mocky.io/v2/5daffe6d2f00001172c1374b';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }
    
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ImageService message with the MessageService */
  private log(message: string) {
    console.log(`ImageService: ${message}`);
  }
  /** GET anyes from the server */
  getImages(): Observable<any[]> {
    return this.http.get<any[]>(this.imagesURL)
      .pipe(
        tap(_ => this.log('fetched anyes')),
        catchError(this.handleError<any[]>('getanyes', []))
      );
  }
}
