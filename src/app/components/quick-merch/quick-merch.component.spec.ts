import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickMerchComponent } from './quick-merch.component';

describe('QuickMerchComponent', () => {
  let component: QuickMerchComponent;
  let fixture: ComponentFixture<QuickMerchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickMerchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickMerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
