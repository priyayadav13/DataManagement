import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TableDataComponent } from '../table-data/table-data.component';
import { ManagementFormComponent } from '../management-form/management-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, TableDataComponent, ManagementFormComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
