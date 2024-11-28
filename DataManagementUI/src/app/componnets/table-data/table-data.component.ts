import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { IntegrateService } from '../../services/integrate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css'],
})
export class TableDataComponent implements OnInit {
  data: any;
  displayedColumns: string[] = ['samplingTime', 'projectName', 'constructionCount', 'isComplete', 'roadLength'];

  constructor(private apiService: IntegrateService) { }

  ngOnInit() {
    this.apiService.getData().subscribe((res) => {
      if (res && res.datas) {
        this.data = this.transformData(res);
        console.log(this.data);
      } else {
        console.error('Invalid data format', res);
      }
    });
  }

  transformData(apiData: any): any[] {
    return apiData.datas.map((item: any) => {
      const projectName = item.properties.find((p: any) => p.label === 'Project Name')?.value ?? 'N/A';
      const constructionCount = item.properties.find((p: any) => p.label === 'Construction Count')?.value ?? 'N/A';
      const isConstructionCompleted = item.properties.find((p: any) => p.label === 'Is Construction Completed')?.value ?? false;
      const roadLength = item.properties.find((p: any) => p.label === 'Length of the road')?.value ?? 'N/A';

      return {
        samplingTime: item.samplingTime,
        projectName,
        constructionCount,
        isConstructionCompleted,
        roadLength,
      };
    });
  }
}
