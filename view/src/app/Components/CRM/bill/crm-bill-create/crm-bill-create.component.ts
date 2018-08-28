import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-crm-bill-create',
  templateUrl: './crm-bill-create.component.html',
  styleUrls: ['./crm-bill-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class CrmBillCreateComponent implements OnInit {


  _Customers: any[] =  ['Customer Name One', 'Customer Name Two', '+91 9876543210', '+91 9753186420'];

  _Methods: any[] = ['Cash', 'Card'];

  TodayDate = new Date().toLocaleDateString('en-GB');

  SelectedMethod;
  Form: FormGroup;

  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';

  constructor() { }

  ngOnInit() {
   this.Form = new FormGroup({
      Date: new FormControl(new Date(), Validators.required),
   });
  }

  MethodChange(eve) {
    console.log(eve);
  }

  NotAllow(): boolean {return false; }

  formatDate(date) {
   const d = new Date(date);
   let month = '' + (d.getMonth() + 1);
   let day = '' + d.getDate();
   const year = d.getFullYear();
   if (month.length < 2) { month = '0' + month; }
   if (day.length < 2) { day = '0' + day; }
   return [year, month, day].join('-');
}

}
