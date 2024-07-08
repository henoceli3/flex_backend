import { PipeTransform } from '@nestjs/common';

export class FileTypeValidationPipe implements PipeTransform {
  transform(value: any) {
    const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    return acceptedFileTypes.includes(value.mimetype);
  }
}
