import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IntegrateService } from '../../services/integrate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-management-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './management-form.component.html',
  styleUrls: ['./management-form.component.css']
})
export class ManagementFormComponent implements OnInit {
  data: any;
  selectedSamplingTime: any;
  detailedFormVisible: boolean = false;
  datePipe: any;
  constructor(private apiService: IntegrateService, private http: HttpClient, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.apiService.getData().subscribe((res) => {
      this.data = res.datas;
      console.log(this.data);
    });
  }

  //to display data left side based on clicked sampling time
  onSamplingTimeClick(samplingTime: string): void {
    const selectedData = this.data.find((item: any) => item.samplingTime === samplingTime);
    if (selectedData) {
      this.selectedSamplingTime = selectedData;
      this.detailedFormVisible = true;
    }
  }

  //onsubmit send data in req format to put api
  onSubmit(): void {
    const samplingTime = this.formatDate(this.selectedSamplingTime.samplingTime)

    const updatedProperties = this.selectedSamplingTime.properties.map((property: any) => {
      if (typeof property.value === 'string') {
        if (property.value === 'true' || property.value === 'false') {
          property.value = property.value === 'true';
        } else if (!isNaN(Number(property.value))) {
          property.value = Number(property.value);
        }
      }
      return property;
    });

    alert('Data updated successfully!');
    const updatedData = {
      samplingTime: samplingTime,
      properties: updatedProperties
    };

    console.log(updatedData)
    this.apiService.updateData(updatedData).subscribe(Response => {
      console.log('Data updated successfully:', Response);
      this.detailedFormVisible = false;
    })
  }

  //function to identify datatype of value,
  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  //to format sampling date format
  private formatDate(dateInput: string | Date): string {
    const date = new Date(dateInput);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  }

  openSnackBar() {
    this.snackBar.open('Data saved successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

}
