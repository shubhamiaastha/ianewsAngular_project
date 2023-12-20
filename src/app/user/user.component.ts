
// import { Component, OnInit } from '@angular/core';
// import { NewsDataService } from "../services/news-data.service";

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.scss']
// })
// export class UserComponent implements OnInit {
//   cardDataArray: any[] = [];
//   currentPage = 1;
//   isLoading = false;

//   constructor(private newData: NewsDataService) {}

//   ngOnInit() {
//     this.loadPage();
//   }

//   loadPage() {
//     this.isLoading = true;
//     this.newData.news(this.currentPage).subscribe(
//       (data: any) => {
//         console.warn(data);
//         if (data && data.data && Array.isArray(data.data.news)) {
//           this.cardDataArray = data.data.news;
//           console.warn(this.cardDataArray);
//         } else {
//           console.error('Invalid data  Response :', data);
//         }
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       },
//       () => {
//         this.isLoading = false;
//       }
//     );
//   }

//   onNextClick() {
//     this.currentPage++;
//     this.loadPage();
//   }

//   onPreviousClick() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.loadPage();
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { NewsDataService } from "../services/news-data.service";

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.scss']
// })
// export class UserComponent implements OnInit {
//   cardDataArray: any[] = [];
//   currentPage = 1;
//   isLoading = false;
//   isHoveredIndex: number = -1;

//   constructor(private newData: NewsDataService) {}

//   ngOnInit() {
//     this.loadPage();
//   }

//   async loadPage() {
//     this.isLoading = true;

//     try {
//       const data: any = await this.newData.news(this.currentPage).toPromise();

//       console.log('API Response for Page', this.currentPage, ':', data);

//       if (data && data.data && Array.isArray(data.data.news)) {
//         this.cardDataArray = data.data.news;
//         console.warn(this.cardDataArray);
//       } else {
//         console.error('Invalid data Response:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       this.isLoading = false;
//     }
//   }

//   setHoveredIndex(index: number) {
//     this.isHoveredIndex = index;
//   }

//   async onNextClick() {
//     this.currentPage++;
//     await this.loadPage();
//   }

//   async onPreviousClick() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       await this.loadPage();
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { NewsDataService } from "../services/news-data.service";
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  cardDataArray: any[] = [];
  currentPage = 1;
  isLoading = false;
  isHoveredIndex: number = -1;

  constructor(private newData: NewsDataService) {}

  ngOnInit() {
    this.loadPage();
  }

  async loadPage() {
    this.isLoading = true;

    try {
      const data: any = await this.newData.news(this.currentPage)
        .pipe(
          delay(500) // Adjust the delay time as needed
        )
        .toPromise();

      console.log('API Response for Page', this.currentPage, ':', data);

      if (data && data.data && Array.isArray(data.data.news)) {
        this.cardDataArray = data.data.news;
        console.log('Card Data Array:', this.cardDataArray);
      } else {
        console.error('Invalid data response:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  setHoveredIndex(index: number) {
    this.isHoveredIndex = index;
  }

  async onNextClick() {
    this.currentPage++;
    await this.loadPage();
  }

  async onPreviousClick() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadPage();
    }
  }
}





