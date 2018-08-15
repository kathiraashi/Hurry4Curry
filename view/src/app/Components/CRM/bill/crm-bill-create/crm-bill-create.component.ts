import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-bill-create',
  templateUrl: './crm-bill-create.component.html',
  styleUrls: ['./crm-bill-create.component.css']
})
export class CrmBillCreateComponent implements OnInit {


  _Customers: any[] =  ['Customer Name One', 'Customer Name Two', '+91 9876543210', '+91 9753186420'];

  _Methods: any[] = ['Cash', 'Card'];

  TodayDate = new Date().toLocaleDateString('en-GB');

  SelectedMethod;

  constructor() { }

  ngOnInit() {
  }

  MethodChange(eve) {
    console.log(eve);
  }

}
