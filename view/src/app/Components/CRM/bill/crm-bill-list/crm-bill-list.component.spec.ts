import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBillListComponent } from './crm-bill-list.component';

describe('CrmBillListComponent', () => {
  let component: CrmBillListComponent;
  let fixture: ComponentFixture<CrmBillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmBillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
