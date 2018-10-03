import { Component, OnInit } from '@angular/core';


import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../../services/common-service/Toaster-Service/toaster-service.service';
import { ProductService } from './../../../../services/Product/product.service';
import { PurchaseRequestService } from './../../../../services/PurchaseRequest/purchase-request.service';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {
  User_Id;
  _PurchaseRequestList: any[] = [];

   bsModalRef: BsModalRef;
  ActionIndex: any;
   constructor( private modalService: BsModalService,
    private Toaster: ToasterServiceService,
    public Product_Service: ProductService,
    public PurchaseRequest_Service: PurchaseRequestService,
    public Service: AdminService,
    public router: Router,
    private active_route: ActivatedRoute) {  this.User_Id = this.Service.GetUserInfo()['_id']; }


   ngOnInit() {
     const Data = { User_Id : this.User_Id };
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.PurchaseRequest_Service.PurchaseRequest_List({'Info': Info}).subscribe(response => {
       const ResponseData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ResponseData['Status']) {
         const CryptoBytes = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
         const DecryptData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         this._PurchaseRequestList = DecryptData;
       } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
         this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
       } else if (response['status'] === 401 && !ResponseData['Status']) {
         this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
       } else {
         this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Supplier List Getting Error!, But not Identify!' });
       }
     });
   }

  View(_index) {
    this.ActionIndex = _index;
    this.router.navigate(['/Purchase_Request_View', this._PurchaseRequestList[this.ActionIndex]['_id']]);
  }
   DeletePurchaseRequest() {
      const initialState = {
         Text: 'Purchase Request'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
