import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyService {
  private readonly BACKEND_URL = 'https://uxcandy.com/~shapoval/test-task-backend/?developer=Roman';

  constructor(private http: HttpClient) {
  }

  getCompanies(params: string): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(`${this.BACKEND_URL}${params}`, { observe: 'response' });
  }
}

interface responseCompany {
    status: string,
    message: any
}
