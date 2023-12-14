
import { Component, OnInit } from '@angular/core';
import { NewsDataService } from "../services/news-data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  cardDataArray: any[] = [];
  currentPage = 1;
  isLoading = false;

  constructor(private newData: NewsDataService) {}

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.isLoading = true;
    this.newData.news(this.currentPage).subscribe(
      (data: any) => {
        console.warn(data);
        if (data && data.data && Array.isArray(data.data.news)) {
          this.cardDataArray = data.data.news;
          console.warn(this.cardDataArray);
        } else {
          console.error('Invalid data  Response :', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onNextClick() {
    this.currentPage++;
    this.loadPage();
  }

  onPreviousClick() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage();
    }
  }
}



