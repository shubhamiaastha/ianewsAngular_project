import { Component, OnInit } from '@angular/core';
import { NewsDataService } from "../services/news-data.service";
import { delay } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  cardDataArray: any[] = [];
  currentPage = 1;
  latestNewsId = "";
  oldestNewsId= "";
  isLoading = false;
  isHoveredIndex: number = -1;

  constructor(private newData: NewsDataService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadPage("","");
  }

  async loadPage(newsId : string , cursor : string) {
    this.isLoading = true;

    try {
      const data: any = await this.newData.news(newsId,cursor)
        .pipe(
          delay(500) // Adjust the delay time as needed
        )
        .toPromise();

      console.log('API Response for Page', this.currentPage, ':', data);

      if (data && data.data && Array.isArray(data.data.news) && cursor == "") {
        this.cardDataArray = data.data.news;
        this.latestNewsId = data.data.maxTs
        this.oldestNewsId = data.data.minTs
        console.log('Card Data Array:', this.cardDataArray);
      }
      else if (data && data.data && Array.isArray(data.data.news) && cursor == "nextCursor") {
        this.cardDataArray = data.data.news;
        this.latestNewsId = data.data.maxTs
        this.oldestNewsId = data.data.minTs
        console.log('Card Data Array:', this.cardDataArray);
      }
      else if (data && data.data && Array.isArray(data.data.news) && cursor == "prevCursor") {
        this.cardDataArray = data.data.news;
        this.cardDataArray.reverse()
        this.latestNewsId = data.data.maxTs
        this.oldestNewsId = data.data.minTs
        console.log('Card Data Array:', this.cardDataArray);
      }
      else {
        console.error('Invalid data response:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  handleImageError(event: any, user: any) {
    console.error('Error loading image for user:', user);
    console.error('Error details:', event);
    user.en.imageLoadError = true;      
  
  
  }

  setHoveredIndex(index: number) {
    this.isHoveredIndex = index;
  }

  async onNextClick() {
    this.currentPage++;
    await this.loadPage(this.oldestNewsId,"nextCursor");
  }

  async onPreviousClick() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadPage(this.latestNewsId,"prevCursor");
    }
  }
}





