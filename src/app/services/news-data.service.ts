import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  apiUrl = 'https://prod.maritimes.news/api/news/latest/internal';

  constructor(private http: HttpClient) {}

  news(page?: number): Observable<any> {
    const url = page ? `${this.apiUrl}?page=${page}` : this.apiUrl;
    // Add your headers or any other configuration as needed
    return this.http.get(url);
  }
}

