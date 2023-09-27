import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'

import { RxStompService } from './rx-stomp.service';
import { rxStompServiceFactory } from './rx-stomp-service-factory';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { ChatRoomFormComponent } from './chat-room-form/chat-room-form.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    ChatLogComponent,
    ChatRoomFormComponent
  ],
  providers: [
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
