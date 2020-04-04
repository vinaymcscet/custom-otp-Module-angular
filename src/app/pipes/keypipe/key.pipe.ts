import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeyPipe implements PipeTransform {

  transform(value: any): string[] {
    return Object.keys(value);
  }

}
