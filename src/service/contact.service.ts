import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ContactRepository } from '../repository/contact.repository';
import { ContactEntity } from '../model/entity/contact.entity';
import { ContactDto } from '../model/dto/contact.dto';
import { ResponseDto } from '../model/dto/response.dto';
import { CreateContactDto } from '../model/dto/create.contact.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ContactService {

  @Inject()
  private readonly contactRepository: ContactRepository;

  async getFindAll(): Promise<ResponseDto<ContactDto[]>> {
    const contacts: ContactEntity[] = await this.contactRepository.findAll();
    const dtos: ContactDto[] = [];
    for (const contact of contacts) {
      dtos.push(this.convertEntityToDto(contact));
    }
    return new ResponseDto<ContactDto[]>(HttpStatus.OK, 'Get contacts', dtos);
  }

  async createContact(createDto: CreateContactDto): Promise<ResponseDto> {
    const contact: ContactEntity = new ContactEntity();
    contact.firstName = createDto.firstName;
    contact.lastName = createDto.lastName;
    contact.age = createDto.age;
    contact.photo = createDto.photo;

    if (await this.contactRepository.saveContact(contact)) {
      return new ResponseDto(HttpStatus.CREATED, 'Success!');
    }
    return new ResponseDto(HttpStatus.BAD_REQUEST, 'Failed!');
  }

  async getContactById(contactId: string): Promise<ResponseDto<ContactDto>> {
    const contactEntity: ContactEntity = await this.contactRepository.findById(contactId);
    if (!contactEntity) {
      return new ResponseDto(HttpStatus.BAD_REQUEST, `data id ${contactId} is not in contact list`);
    }
    return new ResponseDto<ContactDto>(HttpStatus.OK, 'Get Contact by id', this.convertEntityToDto(contactEntity));
  }

  async deleteContactById(contactId: string): Promise<ResponseDto<ContactDto>> {
    const contactEntity: ContactEntity = await this.contactRepository.findById(contactId);
    if (!contactEntity) {
      return new ResponseDto(HttpStatus.BAD_REQUEST, 'contact unavailable');
    }

    const deleteResult: DeleteResult = await this.contactRepository.delete(contactEntity);
    if (deleteResult && deleteResult.affected > 0) {
      return new ResponseDto(HttpStatus.ACCEPTED, 'contact deleted');
    }
    return new ResponseDto(HttpStatus.BAD_REQUEST, 'Failed!');
  }

  async updateContact(contactId: string, createDto: CreateContactDto): Promise<ResponseDto<ContactDto>> {
    const contactEntity: ContactEntity = await this.contactRepository.findById(contactId);
    if (!contactEntity) {
      return new ResponseDto<ContactDto>(HttpStatus.BAD_REQUEST, `data id ${contactId} is not in contact list`);
    }
    contactEntity.firstName = createDto.firstName;
    contactEntity.lastName = createDto.lastName;
    contactEntity.age = createDto.age;
    if (!createDto.photo || createDto.photo === 'N/A') {
      contactEntity.photo = null;
    } else {
      contactEntity.photo = createDto.photo;
    }

    if (await this.contactRepository.updateContact(contactEntity)) {
      return new ResponseDto<ContactDto>(HttpStatus.CREATED, 'Contact edited', contactEntity);
    } else {
      return new ResponseDto(HttpStatus.BAD_REQUEST, 'Failed!');
    }
  }

  private convertEntityToDto(contactEntity: ContactEntity): ContactDto {
    const dto: ContactDto = new ContactDto();
    dto.id = contactEntity.id;
    dto.firstName = contactEntity.firstName;
    dto.lastName = contactEntity.lastName;
    dto.age = contactEntity.age;
    if (!contactEntity.photo) {
      dto.photo = 'N/A';
    } else {
      dto.photo = contactEntity.photo;
    }
    return dto;
  }

}
