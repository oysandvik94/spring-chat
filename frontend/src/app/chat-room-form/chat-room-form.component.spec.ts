import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomFormComponent } from './chat-room-form.component';

describe('ChatRoomFormComponent', () => {
  let component: ChatRoomFormComponent;
  let fixture: ComponentFixture<ChatRoomFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatRoomFormComponent]
    });
    fixture = TestBed.createComponent(ChatRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
