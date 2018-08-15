import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBillViewComponent } from './crm-bill-view.component';

describe('CrmBillViewComponent', () => {
  let component: CrmBillViewComponent;
  let fixture: ComponentFixture<CrmBillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmBillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
