import { Routes } from '@angular/router';
import { ManagementFormComponent } from './componnets/management-form/management-form.component';
import { TableDataComponent } from './componnets/table-data/table-data.component';

export const routes: Routes = [
  { path: '', component: TableDataComponent },
  { path: 'detailed-view', component: ManagementFormComponent },
];
