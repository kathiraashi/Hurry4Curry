import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-list-attendance-report',
  templateUrl: './list-attendance-report.component.html',
  styleUrls: ['./list-attendance-report.component.css']
})
export class ListAttendanceReportComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }


  ngOnInit() {
  }


}
