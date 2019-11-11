import { ApiModelProperty } from '@nestjs/swagger';
import { CreateContactDto } from '../dto/create.contact.dto';

export class ResponseDataSwagger {
  @ApiModelProperty()
  message: string;
  @ApiModelProperty({type: CreateContactDto})
  data: CreateContactDto;
}
