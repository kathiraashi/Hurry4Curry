// Default Modules
   import { NgModule } from '@angular/core';
   import { CommonModule} from '@angular/common';
   import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
   import { BrowserModule } from '@angular/platform-browser';
   import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
   import { FormsModule, ReactiveFormsModule } from '@angular/forms';
   import { HttpModule } from '@angular/http';
   import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
   import { RouterModule, Routes } from '@angular/router';

// Default Components
   import { AppComponent } from './app.component';

// Future Modules
   import { ModalModule, AccordionModule} from 'ngx-bootstrap';
   import {CalendarModule} from 'primeng/calendar';
   import {MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatMenuModule} from '@angular/material';
   import { NgSelectModule } from '@ng-select/ng-select';

// Custom Modules
   import { AppRoutingModule } from './app.routing.module';
   import { AuthGuard } from './Authentication/auth.guard';

// Custom Components
   // Component Folder
      // Common-Components ---------------------------------------------------
         import { DeleteConfirmationComponent } from './Components/Common-Components/delete-confirmation/delete-confirmation.component';
         import { HeaderComponent } from './Components/Common-Components/header/header.component';
         import { LoginComponent } from './Components/Common-Components/login/login.component';

      // Sales Folder --------------------------------------------------------------
         // Customers ----------------
            // Sales Customers List
               import { CrmCustomersListComponent } from './Components/CRM/Customers/crm-customers-list/crm-customers-list.component';
            // Sales Customers View
               // Main Sales Customers View
                  import { MainCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/main-crm-customers-view/main-crm-customers-view.component';
            // Sales-customers-create
                import { CrmCustomersCreateComponent } from './Components/CRM/Customers/crm-customers-create/crm-customers-create.component';
      // Leads Folder ----------------------------------------------------

// models
    // Inventory folder
        // Inventory_Request
        import { PurchaseRequestListComponent } from './Components/Purchase/PurchaseRequest/purchase-request-list/purchase-request-list.component';
        import { PurchaseRequestCreateComponent } from './Components/Purchase/PurchaseRequest/purchase-request-create/purchase-request-create.component';
        import { PurchaseRequestViewComponent } from './Components/Purchase/PurchaseRequest/purchase-request-view/purchase-request-view.component';
        // Vendor Bills
        import { VendorBillsListComponent } from './Components/Purchase/VendorBills/vendor-bills-list/vendor-bills-list.component';
        import { VendorBillsCreateComponent } from './Components/Purchase/VendorBills/vendor-bills-create/vendor-bills-create.component';
        import { VendorBillsViewComponent } from './Components/Purchase/VendorBills/vendor-bills-view/vendor-bills-view.component';

    // Accounts Folder
        // Customer
            import { AccountsCustomerPaymentsListComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-list/accounts-customer-payments-list.component';
        // vendor
            import { AccountsCustomerPaymentsViewComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-view/accounts-customer-payments-view.component';
import { CustomerPaymentsCreateComponent } from './Components/Accounts/customer-payments/customer-payments-create/customer-payments-create.component';
import { VendorPaymentsListComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-list/vendor-payments-list.component';
import { VendorPaymentsCreateComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-create/vendor-payments-create.component';
import { VendorPaymentsViewComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-view/vendor-payments-view.component';


// Services
import { EmployeesCreateComponent } from './Components/HR/Employees/employees-create/employees-create.component';
import { EmployeesListComponent } from './Components/HR/Employees/employees-list/employees-list.component';
import { EmployeesViewComponent } from './Components/HR/Employees/employees-view/employees-view.component';
import { CreateAttendanceLogComponent } from './Components/HR/Attendance-Log/create-attendance-log/create-attendance-log.component';
import { ListAttendanceLogComponent } from './Components/HR/Attendance-Log/list-attendance-log/list-attendance-log.component';
import { ViewAttendanceLogComponent } from './Components/HR/Attendance-Log/view-attendance-log/view-attendance-log.component';
import { CreateAttendanceReportComponent } from './Components/HR/Attendance-Report/create-attendance-report/create-attendance-report.component';
import { ListAttendanceReportComponent } from './Components/HR/Attendance-Report/list-attendance-report/list-attendance-report.component';
import { ViewAttendanceReportComponent } from './Components/HR/Attendance-Report/view-attendance-report/view-attendance-report.component';
import { PayrollListComponent } from './Components/HR/Payroll/payroll-list/payroll-list.component';
import { PayrollViewComponent } from './Components/HR/Payroll/payroll-view/payroll-view.component';
import { CreatePayrollMasterComponent } from './Components/HR/Payroll-Master/create-payroll-master/create-payroll-master.component';
import { ListPayrollMasterComponent } from './Components/HR/Payroll-Master/list-payroll-master/list-payroll-master.component';
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


@NgModule({
   declarations: [
      // Default Components
         AppComponent,
      // Custom Components
         // Component Folder
            // Common-Components Folder
              HeaderComponent,
   // Components
    // Common-Components
        // delete-confirmation
                 DeleteConfirmationComponent,
    // Sales Folder
        // Customers
            // Sales-customers-list
                CrmCustomersListComponent,
                 // main Sales customers view
                    MainCrmCustomersViewComponent,
                    // SubComponents
                    CrmCustomersCreateComponent,
    // Inventory Folder
        // Inventory Request
        PurchaseRequestListComponent,
        PurchaseRequestCreateComponent,
        PurchaseRequestViewComponent,
        // Vendor Bills
         VendorBillsListComponent,
         VendorBillsCreateComponent,
         VendorBillsViewComponent,

   // Accounts Folder
        // Customer

            AccountsCustomerPaymentsListComponent,

        // vendor
            AccountsCustomerPaymentsViewComponent,
            CustomerPaymentsCreateComponent,
            VendorPaymentsListComponent,
            VendorPaymentsCreateComponent,
            VendorPaymentsViewComponent,
            LoginComponent,
            EmployeesCreateComponent,
            EmployeesListComponent,
            EmployeesViewComponent,
            CreateAttendanceLogComponent,
            ListAttendanceLogComponent,
            ViewAttendanceLogComponent,
            CreateAttendanceReportComponent,
            ListAttendanceReportComponent,
            ViewAttendanceReportComponent,
            PayrollListComponent,
            PayrollViewComponent,
            CreatePayrollMasterComponent,
            ListPayrollMasterComponent,
            DashBoardComponent,
            ListProductComponent,
            CreateProductComponent,
            ViewProductComponent,
            ListStockValuesComponent,
            ViewStockValuesComponent,
            ListBankRegistersComponent,
            ListCashRegistersComponent,
            DashBoardComponent,
            CrmBillCreateComponent,
            CrmBillListComponent,
            CrmBillViewComponent,
            ReceiveProductListComponent,
            ReceiveProductViewComponent


   ],
   imports: [
      // Default Modules
         BrowserModule,
         BrowserAnimationsModule,
         RouterModule,
         HttpModule,
         HttpClientModule,
         FormsModule,
         ReactiveFormsModule,
      // future modules
         ModalModule.forRoot(),
         AccordionModule.forRoot(),
         CalendarModule,
         NgSelectModule,
         MatButtonModule,
         MatFormFieldModule,
         MatSelectModule,
         MatCheckboxModule,
         MatMenuModule,
      // Custom Modules
         AppRoutingModule,
   ],
   providers: [AuthGuard],
   entryComponents: [
      DeleteConfirmationComponent,
    ],
   bootstrap: [AppComponent]
})
export class AppModule { }

