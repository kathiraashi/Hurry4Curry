import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder, AbstractControl  } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { map } from 'rxjs/operators';
import { AdminService } from './../../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../../services/common-service/Toaster-Service/toaster-service.service';
import { ProductService } from './../../../../services/Product/product.service';
import { PurchaseRequestService } from './../../../../services/PurchaseRequest/purchase-request.service';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-request-view',
  templateUrl: './purchase-request-view.component.html',
  styleUrls: ['./purchase-request-view.component.css']
})
export class PurchaseRequestViewComponent implements OnInit {

  User_Id;
  PurchaseRequest_Id;
  Loader: Boolean = false;
  _Data;
  ActionIndex: any;
  Form: FormGroup;
  Products: FormArray;

  modalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private Toaster: ToasterServiceService,
    public Product_Service: ProductService,
    public PurchaseRequest_Service: PurchaseRequestService,
    public Service: AdminService,
    public router: Router,
    private active_route: ActivatedRoute,
    public modalService: BsModalService
  ) { this.User_Id = this.Service.GetUserInfo()['_id']; }

  ngOnInit() {
    this.active_route.url.subscribe((u) => {
      this.PurchaseRequest_Id = this.active_route.snapshot.params['PurchaseRequest_Id'];
      const Data = {'User_Id': this.User_Id, 'PurchaseRequest_Id': this.PurchaseRequest_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Loader = true;
      this.PurchaseRequest_Service.PurchaseRequest_View({'Info': Info}).subscribe(response => {
        const ResponseData = JSON.parse(response['_body']);
        this.Loader = false;
        if (response['status'] === 200 && ResponseData['Status'] ) {
          const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
          const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
          this._Data = DecryptedData;
       } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
       } else if (response['status'] === 401 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
       } else {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Purchase request Data Getting Error!, But not Identify!' });
       }
      });
    });

    this.Form = new FormGroup({
      Products: this.formBuilder.array([]),
    });
  }

  SetActionId(_index) {
    this.ActionIndex = _index;
  }

  Approve(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {ignoreBackdropClick: true, class: 'modal-lg' }) );
    this.ApproveProducts();
  }

  ApproveProducts() {
    this.Products = this.Form.get('Products') as FormArray;
    this.Products.setValue([]);
    this._Data['PurchaseRequest_Product_Details'].map(obj => {
      const newForm: FormGroup = this.formBuilder.group({
        _id: new FormControl({value: obj['_id'], disabled: true}, Validators.required),
        ProductName: new FormControl({value: obj['Product_Id']['Name_withAttribute'], disabled: true}, Validators.required),
        Quantity: new FormControl({value: obj['Quantity'], disabled: true}, Validators.required),
        Approved_Quantity: new FormControl(obj['Approved_Quantity'], Validators.required),
      });
      this.Products.push(newForm);
    });
  }


  Submit() {
    this.modalRef.hide();
    const Product_Data = this.Form.getRawValue();
    if (this.Form.valid) {
      const Data = {'User_Id': this.User_Id, 'PurchaseRequest_Id': this.PurchaseRequest_Id , 'Product_Data': Product_Data };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.PurchaseRequest_Service.PurchaseRequest_Update({ 'Info': Info }).subscribe( response => {
        const ResponseData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ResponseData['Status'] ) {
          this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Successfully order Created' });
           this.router.navigate(['/Purchase_Request_List']);
        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Creating Purchase Bill Getting Error!, But not Identify!' });
        }
     });
    }
  }
}
