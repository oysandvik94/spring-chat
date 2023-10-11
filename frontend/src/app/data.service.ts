import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ChatRoom } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private API_URL: string = 'http://127.0.0.1:8080/api';

  constructor(private httpClient: HttpClient) {}

  public getChatRooms(username: string): Observable<ChatRoom[]> {
    return this.httpClient
      .get<ChatRoom[]>(`${this.API_URL}/rooms/${username}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
