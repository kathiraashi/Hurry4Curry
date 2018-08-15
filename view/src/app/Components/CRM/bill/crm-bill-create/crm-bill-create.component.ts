import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-bill-create',
  templateUrl: './crm-bill-create.component.html',
  styleUrls: ['./crm-bill-create.component.css']
})
export class CrmBillCreateComponent implements OnInit {

  Active_Tab = 'Product_Details';

  constructor() { }

  ngOnInit() {
  }

  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }

}
