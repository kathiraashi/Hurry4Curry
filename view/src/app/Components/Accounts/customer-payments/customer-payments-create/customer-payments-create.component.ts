import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-payments-create',
  templateUrl: './customer-payments-create.component.html',
  styleUrls: ['./customer-payments-create.component.css']
})
export class CustomerPaymentsCreateComponent implements OnInit {

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
