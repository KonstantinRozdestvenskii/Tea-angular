import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText'
})
export class SliceTextPipe implements PipeTransform {

  transform(value: string, symbolCount: number = 100): string {
    return value.length >= symbolCount ? value.substring(0, symbolCount).trimEnd() + '...' : value;
  }

}
