

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, words: number): string {
    if (!value) return '';

    const contentWords = value.split(' ');
    if (contentWords.length <= words) {
      return value;
    } else {
      return contentWords.slice(0, words).join(' ') + '...';
    }
  }
}
