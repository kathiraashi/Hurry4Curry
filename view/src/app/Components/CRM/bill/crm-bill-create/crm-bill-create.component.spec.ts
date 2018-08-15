import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBillCreateComponent } from './crm-bill-create.component';

describe('CrmBillCreateComponent', () => {
  let component: CrmBillCreateComponent;
  let fixture: ComponentFixture<CrmBillCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmBillCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBillCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
