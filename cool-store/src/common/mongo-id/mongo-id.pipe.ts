import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (isMongoId(value)) return value
        else throw new BadRequestException(`${value} is not a valid Object Id `);
    }
}
