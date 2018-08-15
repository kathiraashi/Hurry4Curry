import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-request-create',
  templateUrl: './purchase-request-create.component.html',
  styleUrls: ['./purchase-request-create.component.css']
})
export class PurchaseRequestCreateComponent implements OnInit {

   TodayDate = new Date().toLocaleDateString('en-GB');

   _Hubs: any[] = ['Hub One', 'Hub Two'];

   constructor() { }

   ngOnInit() {
   }


}
