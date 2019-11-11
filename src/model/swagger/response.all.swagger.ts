import { ApiModelProperty } from '@nestjs/swagger';
import { CreateContactDto } from '../dto/create.contact.dto';

export class ResponseAllSwagger {
  @ApiModelProperty()
  message: string;
  @ApiModelProperty({isArray: true, type: CreateContactDto})
  data: CreateContactDto[];
}
