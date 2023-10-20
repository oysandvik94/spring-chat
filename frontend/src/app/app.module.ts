import { NgModule, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { RxStompService } from './rx-stomp.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { ChatRoomFormComponent } from './chat-room-form/chat-room-form.component';
import { CanActivateFn, Router, RouterModule, UrlTree } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { UsernameSplashComponent } from './username-splash/username-splash.component';
import { Observable } from 'rxjs';

export const activeUserGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const currentUser = inject(RxStompService).activeUser ? true : false;

  const isAnonymous = !currentUser;
  if (isAnonymous) {
    return inject(Router).navigate(['/']);
  }

  return true;
};

@NgModule({
  declarations: [
    AppComponent,
    UsernameSplashComponent,
  ],
  imports: [
    BrowserModule,
    ChatPageComponent,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChatLogComponent,
    ChatRoomFormComponent,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: UsernameSplashComponent },
      {
        path: 'chat',
        component: ChatPageComponent,
        canActivate: [activeUserGuard],
      },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
