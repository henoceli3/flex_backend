import { PipeTransform } from '@nestjs/common';
export declare class FileTypeValidationPipe implements PipeTransform {
    transform(value: any): boolean;
}
