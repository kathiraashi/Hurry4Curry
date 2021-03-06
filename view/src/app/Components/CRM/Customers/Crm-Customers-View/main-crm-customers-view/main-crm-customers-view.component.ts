import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-main-crm-customers-view',
  templateUrl: './main-crm-customers-view.component.html',
  styleUrls: ['./main-crm-customers-view.component.css']
})
export class MainCrmCustomersViewComponent implements OnInit {

   Active_Tab = 'About';
   bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
   this.Active_Tab = name;
   }

}
