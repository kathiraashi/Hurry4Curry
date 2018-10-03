import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder, AbstractControl  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';


import { AdminService } from './../../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../../services/common-service/Toaster-Service/toaster-service.service';
import { ProductService } from './../../../../services/Product/product.service';
import { PurchaseRequestService } from './../../../../services/PurchaseRequest/purchase-request.service';
import { log } from 'util';

@Component({
  selector: 'app-purchase-request-create',
  templateUrl: './purchase-request-create.component.html',
  styleUrls: ['./purchase-request-create.component.css']
})
export class PurchaseRequestCreateComponent implements OnInit {

  Form: FormGroup;
  StockData;
  _HubList;
  _ProductList: any[] = [];
  selectedOption: string;
  _temProductList: any[] = [];
  User_Id: any;
  Supplier_Id: any;
  price: any;
  Price_Value: number;
  Quantity_Value: number;
  Total_Value;
  items: FormArray;
  referenceInput;
  today: number = Date.now();

  constructor(private Toaster: ToasterServiceService,
  public Product_Service: ProductService,
  public PurchaseRequest_Service: PurchaseRequestService,
  public Service: AdminService,
  public router: Router,
  private formBuilder: FormBuilder,
  private active_route: ActivatedRoute) { this.User_Id = this.Service.GetUserInfo()['_id']; }

  ngOnInit() {
    this.Form = new FormGroup({
      User_Id: new FormControl(this.User_Id, Validators.required),
      Hub_Id: new FormControl(null, Validators.required),
      PurchaseRequest_Date: new FormControl(new Date(), [Validators.required]),
      Expected_Date: new FormControl(null, [Validators.required]),
      items: this.formBuilder.array([this.createItems()]),
      Date: new FormControl(new Date())
    });
    // Get Supplier List
    const Data = {User_Id : this.User_Id };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    this.Service.Hub_List({'Info': Info}).subscribe( response => {
       const ResponseData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ResponseData['Status'] ) {
          const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
          const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
          this._HubList = DecryptedData.Created_By;
          console.log(this._HubList);
          this.Form.controls['Hub_Id'].setValue(DecryptedData.Created_By._id);
       } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
       } else if (response['status'] === 401 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
       } else {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Supplier List Getting Error!, But not Identify!' });
       }
    });
    // Get Product List
    const PData = { User_Id: this.User_Id };
    let Info_P = CryptoJS.AES.encrypt(JSON.stringify(PData), 'SecretKeyIn@123');
    Info_P = Info_P.toString();
    this.Product_Service.Product_List({ 'Info': Info_P }).subscribe(response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status']) {
        const CryptoBytes = CryptoJS.AES.decrypt(
          ResponseData['Response'],
          'SecretKeyOut@123'
        );
        const DecryptedData = JSON.parse(
          CryptoBytes.toString(CryptoJS.enc.Utf8)
        );
        this._ProductList = DecryptedData;
        this._temProductList = this._ProductList;
      } else if (
        response['status'] === 400 ||
        (response['status'] === 417 && !ResponseData['Status'])
      ) {
        this.Toaster.NewToastrMessage({
          Type: 'Error',
          Message: ResponseData['Message']
        });
      } else if (response['status'] === 401 && !ResponseData['Status']) {
        this.Toaster.NewToastrMessage({
          Type: 'Error',
          Message: ResponseData['Message']
        });
      } else {
        this.Toaster.NewToastrMessage({
          Type: 'Error',
          Message:
            'Product With Variants List Getting Error!, But not Identify!'
        });
      }
    });
  }

// Form Array
createItems(): FormGroup {
  return this.formBuilder.group({
   Product: new FormControl(null, [Validators.required]),
   Quantity: new FormControl(null, [Validators.required]),
  });
 }
 // add items to bill
 addItem(): void {
  this.items = this.Form.get('items') as FormArray;
  this.items.push(this.createItems());
  this.FilterProduct();
 }
 // Filter products
FilterProduct() {
  const selectedProduct = [];
  this.Form.controls['items'].value.map(obj => {
    if (obj.Product !== null) {
      selectedProduct.push(obj.Product._id);
    }
  });
  this._temProductList = this._ProductList.filter(obj => !selectedProduct.includes(obj._id));
}
 // tab or mouse pointer function for product x quantity
 onTabQuantity(_index) {
  const Quantity_Value: number = this.Form.controls['items']['controls'][_index].controls.Quantity.value;
}

Submit() {
  console.log(this.Form.value);
  if (this.Form.valid) {
    let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
    Info = Info.toString();
    this.PurchaseRequest_Service.PurchaseRequest_Create({ 'Info': Info }).subscribe( response => {
       const ResponseData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ResponseData['Status'] ) {
          this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Purchase Bill Successfully Created' });
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

Delete(_index) {
  this.items.removeAt(_index);
  this.FilterProduct();
}
// Datepicker keyup and keydown event false
DoNothing() {
  return false;
}
}
