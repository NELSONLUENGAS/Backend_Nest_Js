import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
    @ApiProperty({
        description: 'Name of the brand',
        example: 'TechCorp',
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) { }

export class BrandModelResponse {

}
