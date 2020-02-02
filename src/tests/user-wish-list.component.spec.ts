import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWishListComponent } from '../app/user-wish-list/user-wish-list.component';

describe('UserWishListComponent', () => {
  let component: UserWishListComponent;
  let fixture: ComponentFixture<UserWishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
