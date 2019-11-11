import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res } from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { ResponseDto } from '../model/dto/response.dto';
import { Response } from 'express';
import { CreateContactDto } from '../model/dto/create.contact.dto';
import {
  ApiBadGatewayResponse,
  ApiModelProperty,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { ResponseAllSwagger } from '../model/swagger/response.all.swagger';
import { ResponseNodataSwagger } from '../model/swagger/response.nodata.swagger';
import { ResponseDataSwagger } from '../model/swagger/response.data.swagger';

@ApiUseTags('contact')
@Controller('contact')
export class ContactController {

  @Inject()
  private readonly appService: ContactService;

  @Get()
  @ApiOperation({title: 'Get all contact'})
  @ApiResponse({status: 200, description: 'Ok', type: ResponseAllSwagger})
  @ApiResponse({status: 500, description: 'Internal Error'})
  async getFindAll(@Res() resp: Response): Promise<Response> {
    const respDto: ResponseDto = await this.appService.getFindAll();
    return this.customResponse(resp, respDto);
  }

  @Post()
  @ApiOperation({title: 'Save contact'})
  @ApiResponse({status: 200, description: 'Ok', type: ResponseNodataSwagger})
  @ApiResponse({status: 400, description: 'Bad Request', type: ResponseNodataSwagger})
  @ApiResponse({status: 500, description: 'Internal Error'})
  async createContact(@Res() resp: Response, @Body() createDto: CreateContactDto): Promise<Response> {
    const respDto: ResponseDto = await this.appService.createContact(createDto);
    return this.customResponse(resp, respDto);
  }

  @Get(':id')
  @ApiOperation({title: 'Get Contact by id'})
  @ApiResponse({status: 200, description: 'Ok', type: ResponseDataSwagger})
  @ApiResponse({status: 400, description: 'Bad Request', type: ResponseNodataSwagger})
  @ApiResponse({status: 500, description: 'Internal Error'})
  async findContact(@Res() resp: Response, @Param('id') id: string): Promise<Response> {
    const respDto: ResponseDto = await this.appService.getContactById(id);
    return this.customResponse(resp, respDto);
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete Contact'})
  @ApiResponse({status: 202, description: 'Accepted', type: ResponseNodataSwagger})
  @ApiResponse({status: 400, description: 'Bad Request', type: ResponseNodataSwagger})
  @ApiResponse({status: 500, description: 'Internal Error'})
  async deleteContact(@Res() resp: Response, @Param('id') id: string): Promise<Response> {
    const respDto: ResponseDto = await this.appService.deleteContactById(id);
    return this.customResponse(resp, respDto);
  }

  @Put(':id')
  @ApiOperation({title: 'Delete Contact'})
  @ApiResponse({status: 201, description: 'Created', type: ResponseDataSwagger})
  @ApiResponse({status: 400, description: 'Bad Request', type: ResponseNodataSwagger})
  @ApiResponse({status: 500, description: 'Internal Error'})
  async updateContact(@Res() resp: Response, @Param('id') id: string, @Body() createDto: CreateContactDto): Promise<Response> {
    const respDto: ResponseDto = await this.appService.updateContact(id, createDto);
    return this.customResponse(resp, respDto);
  }

  private customResponse(response: Response, responseDto: ResponseDto): Response {
    if (responseDto) {
      response.status(responseDto.status);
      response.send(responseDto.data ? responseDto.data : '');
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      response.send('');
    }
    return response;
  }
}
