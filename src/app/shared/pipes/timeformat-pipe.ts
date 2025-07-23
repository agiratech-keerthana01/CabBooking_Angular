import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimeformatPipe implements PipeTransform {

   transform(value: string | null): string {
    if (!value) return '';

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return value; // fallback if date is invalid
    }

    // Format date: e.g., "22 Jul 2024"
    const datePart = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Format time: e.g., "1:45 PM"
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;

    const timePart = `${displayHour}:${minutes.toString().padStart(2, '0')} ${suffix}`;

    return `${datePart}, ${timePart}`;
  }


}
