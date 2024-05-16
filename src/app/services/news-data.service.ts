import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  apiUrl = ' https://prod.maritimes.news/api/v2/news/latest/internal';

  constructor(private http: HttpClient) {}

  news(newsId?: string , cursor?: string): Observable<any> {
    //const url = page ? `${this.apiUrl}?${page}`: this.apiUrl;
    // Add your headers or any other configuration as needed
    var url = ""
    if(cursor === "nextCursor")
       url = newsId? `${this.apiUrl}?oldestTs=${newsId}`: this.apiUrl;
    else if(cursor === "prevCursor")
       url = newsId? `${this.apiUrl}?latestTs=${newsId}` : this.apiUrl;
    else url = this.apiUrl

    console.log(url)
    return this.http.get(url);
  }
}

