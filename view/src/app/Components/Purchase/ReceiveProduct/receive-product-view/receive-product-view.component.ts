import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../../services/common-service/Toaster-Service/toaster-service.service';
import { ProductService } from './../../../../services/Product/product.service';
import { ReceiveProductsService } from './../../../../services/ReceiveProducts/receive-products.service';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receive-product-view',
  templateUrl: './receive-product-view.component.html',
  styleUrls: ['./receive-product-view.component.css']
})
export class ReceiveProductViewComponent implements OnInit {
  User_Id;
  _List;
  Loader: Boolean = false;
  ReceiveProducts_Id: any;

  constructor( private modalService: BsModalService,
    private Toaster: ToasterServiceService,
    public Product_Service: ProductService,
    public ReceiveProducts_Service: ReceiveProductsService,
    public Service: AdminService,
    public router: Router,
    private active_route: ActivatedRoute) { this.User_Id = this.Service.GetUserInfo()['_id']; }

  ngOnInit() {
    this.active_route.url.subscribe((u) => {
      this.ReceiveProducts_Id = this.active_route.snapshot.params['ReceiveProducts_Id'];
      const Data = {'User_Id': this.User_Id, 'ReceiveProducts_Id': this.ReceiveProducts_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Loader = true;
      this.ReceiveProducts_Service.ReceiveProducts_View({'Info': Info}).subscribe(response => {
        const ResponseData = JSON.parse(response['_body']);
        this.Loader = false;
        if (response['status'] === 200 && ResponseData['Status'] ) {
          const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
          const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
          this._List = DecryptedData;
          console.log(this._List);
       } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
       } else if (response['status'] === 401 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
       } else {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Purchase request Data Getting Error!, But not Identify!' });
       }
      });
    });

  }

  Receive() {
    const Data = {'User_Id': this.User_Id, 'ReceiveProducts_Id': this.ReceiveProducts_Id };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    this.ReceiveProducts_Service.ReceiveProducts_UpdateStock({'Info': Info}).subscribe(response => {
      const ResponseData = JSON.parse(response['_body']);
      this.Loader = false;
      if (response['status'] === 200 && ResponseData['Status'] ) {
        this.router.navigate(['/Receive_Product_List']);
        this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Successfully product added to stock' });
     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
        this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
     } else if (response['status'] === 401 && !ResponseData['Status']) {
        this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
     } else {
        this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Error in getting data!, But not Identify!' });
     }
    });
  }

}
