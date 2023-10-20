import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ChatRoom, ChatUser, Notification } from 'src/types/types';

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

  public getChatUser(username: string): Observable<ChatUser> {
    return this.httpClient
      .get<ChatUser>(`${this.API_URL}/users/${username}`)
      .pipe(catchError(this.handleError));
  }

  public createUser(username: string): Observable<ChatUser> {
    return this.httpClient
      .post<ChatUser>(`${this.API_URL}/users`, username)
      .pipe(catchError(this.handleError));
  }

  public acknowledgeNotifications(userId: number, notificationIds: number[]) {
    this.httpClient
      .post(`${this.API_URL}/notifications/read`, {
        notificationIds: notificationIds,
        userId: userId,
      })
      .pipe(catchError(this.handleError))
      .subscribe();
  }

  public getNotificationsForUser(userId: number): Observable<Notification[]> {
    return this.httpClient
      .get<Notification[]>(`${this.API_URL}/notifications/${userId}`)
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
    return throwError(() => error);
  }
}
