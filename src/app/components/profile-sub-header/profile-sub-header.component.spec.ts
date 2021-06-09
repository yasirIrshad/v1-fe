import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSubHeaderComponent } from './profile-sub-header.component';

describe('ProfileSubHeaderComponent', () => {
  let component: ProfileSubHeaderComponent;
  let fixture: ComponentFixture<ProfileSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
