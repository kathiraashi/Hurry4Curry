import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';


import { ToasterServiceService } from './../../../../services/common-service/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { CustomerService } from './../../../../services/Sales/Customer/customer.service';
import { AdminService } from './../../../../services/Admin/admin.service';


@Component({
  selector: 'app-crm-customers-list',
  templateUrl: './crm-customers-list.component.html',
  styleUrls: ['./crm-customers-list.component.css']
})
export class CrmCustomersListComponent implements OnInit {

  User_Id;

  ActionIndex: number;

  Loader: Boolean = true;

  _List: any[] = [];

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService,
    private Toaster: ToasterServiceService,
    public Customer_Service: CustomerService,
    public Service: AdminService,
    public router: Router ) {
      this.User_Id = this.Service.GetUserInfo()['_id'];
  }

  ngOnInit() {
      // Get Customer List
      const Data = {'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Loader = true;
      this.Customer_Service.Customer_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         this.Loader = false;
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Customer List Getting Error!, But not Identify!' });
         }
      });
  }
  SetActionId(_index) {
    this.ActionIndex = _index;
   }

   Edit() {
      this.router.navigate(['/Crm_Customers_Edit', this._List[this.ActionIndex]['_id'] ]);
   }

   View() {
      this.router.navigate(['/Crm_Customers_View', this._List[this.ActionIndex]['_id'] ]);
   }

  DeleteCustomers() {
    const initialState = {
       Text: 'Customer'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
 }

}
