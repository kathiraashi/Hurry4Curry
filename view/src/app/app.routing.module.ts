import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './Authentication/auth.guard';

import { LoginComponent } from './Components/Common-Components/login/login.component';
import { CrmCustomersListComponent } from './Components/CRM/Customers/crm-customers-list/crm-customers-list.component';
import { MainCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/main-crm-customers-view/main-crm-customers-view.component';
import { CrmCustomersCreateComponent } from './Components/CRM/Customers/crm-customers-create/crm-customers-create.component';
import { PurchaseRequestListComponent } from './Components/Purchase/PurchaseRequest/purchase-request-list/purchase-request-list.component';
import {PurchaseRequestCreateComponent  } from './Components/Purchase/PurchaseRequest/purchase-request-create/purchase-request-create.component';
import { VendorBillsListComponent } from './Components/Purchase/VendorBills/vendor-bills-list/vendor-bills-list.component';
import { PurchaseRequestViewComponent } from './Components/Purchase/PurchaseRequest/purchase-request-view/purchase-request-view.component';
import { VendorBillsCreateComponent } from './Components/Purchase/VendorBills/vendor-bills-create/vendor-bills-create.component';
import { VendorBillsViewComponent } from './Components/Purchase/VendorBills/vendor-bills-view/vendor-bills-view.component';
import { AccountsCustomerPaymentsListComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-list/accounts-customer-payments-list.component';
import { CustomerPaymentsCreateComponent } from './Components/Accounts/customer-payments/customer-payments-create/customer-payments-create.component';
import { VendorPaymentsListComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-list/vendor-payments-list.component';
import { VendorPaymentsCreateComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-create/vendor-payments-create.component';
import { AccountsCustomerPaymentsViewComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-view/accounts-customer-payments-view.component';
import { VendorPaymentsViewComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-view/vendor-payments-view.component';
import { EmployeesListComponent } from './Components/HR/Employees/employees-list/employees-list.component';
import { EmployeesCreateComponent } from './Components/HR/Employees/employees-create/employees-create.component';
import {EmployeesViewComponent } from './Components/HR/Employees/employees-view/employees-view.component';
import { ListAttendanceLogComponent } from './Components/HR/Attendance-Log/list-attendance-log/list-attendance-log.component';
import { CreateAttendanceLogComponent } from './Components/HR/Attendance-Log/create-attendance-log/create-attendance-log.component';
import { ViewAttendanceLogComponent } from './Components/HR/Attendance-Log/view-attendance-log/view-attendance-log.component';
import { ListAttendanceReportComponent } from './Components/HR/Attendance-Report/list-attendance-report/list-attendance-report.component';
import { CreateAttendanceReportComponent } from './Components/HR/Attendance-Report/create-attendance-report/create-attendance-report.component';
import { ViewAttendanceReportComponent } from './Components/HR/Attendance-Report/view-attendance-report/view-attendance-report.component';
import { PayrollListComponent } from './Components/HR/Payroll/payroll-list/payroll-list.component';
import { PayrollViewComponent } from './Components/HR/Payroll/payroll-view/payroll-view.component';
import { ListPayrollMasterComponent } from './Components/HR/Payroll-Master/list-payroll-master/list-payroll-master.component';
import { CreatePayrollMasterComponent } from './Components/HR/Payroll-Master/create-payroll-master/create-payroll-master.component';
import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { CreateProductComponent } from './Components/Product/create-product/create-product.component';
import { ViewProductComponent } from './Components/Product/view-product/view-product.component';
import { ListStockValuesComponent } from './Components/Purchase/Stock-Values/list-stock-values/list-stock-values.component';
import { ViewStockValuesComponent } from './Components/Purchase/Stock-Values/view-stock-values/view-stock-values.component';
import { ListBankRegistersComponent } from './Components/Accounts/Bank-Registers/list-bank-registers/list-bank-registers.component';
import { ListCashRegistersComponent } from './Components/Accounts/Cash-Registers/list-cash-registers/list-cash-registers.component';
import { DashBoardComponent } from './Components/DashBoard/dash-board/dash-board.component';

import { CrmBillCreateComponent } from './Components/CRM/bill/crm-bill-create/crm-bill-create.component';
import { CrmBillListComponent } from './Components/CRM/bill/crm-bill-list/crm-bill-list.component';
import { CrmBillViewComponent } from './Components/CRM/bill/crm-bill-view/crm-bill-view.component';

import { ReceiveProductListComponent } from './Components/Purchase/ReceiveProduct/receive-product-list/receive-product-list.component';
import { ReceiveProductViewComponent } from './Components/Purchase/ReceiveProduct/receive-product-view/receive-product-view.component';


const appRoutes: Routes = [
   {
      path: '',
      component: LoginComponent,
      data: { animation: { value: 'Login'}  }
   },
   {
      path: 'Login',
      component: LoginComponent,
      data: { animation: { value: 'Login'}  }
   },
   {
      path: 'Main_Dashboard',
      component: DashBoardComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Main_Dashboard'}   }
   },
   {
      path: 'Crm_Customers_List',
      component: CrmCustomersListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Customers_List'}   }
   },
   {
      path: 'Crm_Customers_View',
      component: MainCrmCustomersViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Customers_View'}   }
   },
   {
      path: 'Crm_Customers_Create',
      component: CrmCustomersCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Customers_Create'}   }
   },
   {
      path: 'Crm_Bill_List',
      component: CrmBillListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Bill_List'}   }
   },
   {
      path: 'Crm_Bill_View',
      component: CrmBillViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Bill_View'}   }
   },
   {
      path: 'Crm_Bill_Create',
      component: CrmBillCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Bill_Create'}   }
   },
   {
      path: 'Purchase_Request_View',
      component: PurchaseRequestViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Request_View'}   }
   },
   {
      path: 'Purchase_Request_List',
      component: PurchaseRequestListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Request_List'}   }
   },
   {
      path: 'Purchase_Request_Create',
      component: PurchaseRequestCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Request_Create'}   }
   },
   {
      path: 'Receive_Product_List',
      component: ReceiveProductListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Receive_Product_List'}   }
   },
   {
      path: 'Receive_Product_View',
      component: ReceiveProductViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Receive_Product_View'}   }
   },
   {
      path: 'Stock_Values_List',
      component: ListStockValuesComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Stock_Values_List'}   }
   },
   {
      path: 'Stock_Values_View',
      component: ViewStockValuesComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Stock_Values_View'}   }
   },
   {
      path: 'Vendor_Bills_List',
      component: VendorBillsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Vendor_Bills_List'}   }
   },
   {
      path: 'Vendor_Bills_View',
      component: VendorBillsViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Vendor_Bills_View'}   }
   },
   {
      path: 'Sales_Bills_List',
      component: AccountsCustomerPaymentsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Sales_Bills_List'}   }
   },
   {
      path: 'Sales_Bills_Create',
      component: CustomerPaymentsCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Sales_Bills_Create'}   }
   },
   {
      path: 'Sales_Bills_View',
      component: AccountsCustomerPaymentsViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Sales_Bills_View'}   }
   },
   {
      path: 'Purchase_Bills_List',
      component: VendorPaymentsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Bills_List'}   }
   },
   {
      path: 'Purchase_Bills_View',
      component: VendorPaymentsViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Bills_View'}   }
   },
   {
      path: 'Bank_Registers_List',
      component: ListBankRegistersComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Bank_Registers_List'}   }
   },
   {
      path: 'Cash_Register_List',
      component: ListCashRegistersComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Cash_Register_List'}   }
   },
   {
      path: 'Products_List',
      component: ListProductComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Products_List'}   }
  },
  {
      path: 'Product_Create',
      component: CreateProductComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Product_Create'}   }
  },
  {
      path: 'Product_View',
      component: ViewProductComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Product_View'}   }
  },

































   {
    path: 'List_Employees',
    component: EmployeesListComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Employees'}   }
},
{
    path: 'Create_Employees',
    component: EmployeesCreateComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Employees'}   }
},
{
    path: 'View_Employees',
    component: EmployeesViewComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Employees'}   }
},
{
    path: 'List_Attendance_Log',
    component: ListAttendanceLogComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Attendance_Log'}   }
},
{
    path: 'Create_Attendance_Log',
    component: CreateAttendanceLogComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Attendance_Log'}   }
},
{
    path: 'View_Attendance_Log',
    component: ViewAttendanceLogComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Attendance_Log'}   }
},
{
    path: 'List_Attendance_Report',
    component: ListAttendanceReportComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Attendance_Report'}   }
},
{
    path: 'Create_Attendance_Report',
    component: CreateAttendanceReportComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Attendance_Report'}   }
},
{
    path: 'View_Attendance_Report',
    component: ViewAttendanceReportComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Attendance_Report'}   }
},
{
    path: 'List_Payroll',
    component: PayrollListComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Payroll'}   }
},
{
    path: 'View_Payroll',
    component: PayrollViewComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Payroll'}   }
},
{
    path: 'List_Payroll_Master',
    component: ListPayrollMasterComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Payroll_Master'}   }
},
{
    path: 'Create_Payroll_Master',
    component: CreatePayrollMasterComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Payroll_Master'}   }
}





];


@NgModule({
    declarations: [ ],
    imports: [ RouterModule.forRoot(appRoutes,
        { enableTracing: true }
      )],
    providers: [],
    bootstrap: []
  })
  export class AppRoutingModule { }
