import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveProductListComponent } from './receive-product-list.component';

describe('ReceiveProductListComponent', () => {
  let component: ReceiveProductListComponent;
  let fixture: ComponentFixture<ReceiveProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
