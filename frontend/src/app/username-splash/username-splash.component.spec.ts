import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameSplashComponent } from './UsernameSplashComponent';

describe('UsernameSplashComponent', () => {
  let component: UsernameSplashComponent;
  let fixture: ComponentFixture<UsernameSplashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsernameSplashComponent]
    });
    fixture = TestBed.createComponent(UsernameSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
