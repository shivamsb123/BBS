import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class RegistrationPipe implements PipeTransform {

  transform(array: any[], field: string, order: number = 1): any[] {
    if (!Array.isArray(array) || array.length <= 1) {
      return array;
    }

    array.sort((a: any, b: any) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue < bValue) {
        return -1 * order;
      } else if (aValue > bValue) {
        return 1 * order;
      } else {
        return 0;
      }
    });

    return array;
  }

}
