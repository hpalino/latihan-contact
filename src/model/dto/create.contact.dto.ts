import { IsInt, IsString, Max, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @IsString()
  @ApiModelProperty({
    required: true,
  })
  firstName: string;

  @IsString()
  @ApiModelProperty({
    required: true,
  })
  lastName: string;

  @IsInt()
  @Min(1)
  @Max(200)
  @ApiModelProperty({
    required: true,
    minimum: 1,
    maximum: 200,
  })
  age: number;

  @ApiModelProperty({
    required: false,
  })
  photo: string | 'N/A';
}
