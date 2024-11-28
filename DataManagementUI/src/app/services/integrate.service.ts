import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrateService {
  apiURL = 'http://localhost:5291/api/JsonData';


  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }

  updateData(request: any): Observable<any> {
    const url = `${this.apiURL}/update`;
    return this.http.put<any>(url, request, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      }
    });
  }
}

