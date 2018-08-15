import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveProductViewComponent } from './receive-product-view.component';

describe('ReceiveProductViewComponent', () => {
  let component: ReceiveProductViewComponent;
  let fixture: ComponentFixture<ReceiveProductViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveProductViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
