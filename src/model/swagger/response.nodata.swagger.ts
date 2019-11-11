import { ApiModelProperty } from '@nestjs/swagger';
import { CreateContactDto } from '../dto/create.contact.dto';

export class ResponseNodataSwagger {
  @ApiModelProperty()
  message: string;
}
