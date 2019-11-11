import { EntityRepository, Repository } from 'typeorm';
import { ContactEntity } from '../model/entity/contact.entity';
import * as uuid from 'uuid/v4';

@EntityRepository(ContactEntity)
export class ContactRepository extends Repository<ContactEntity> {

  findAll(): Promise<ContactEntity[]> {
    return this.find({});
  }

  findById(contactId: string): Promise<ContactEntity> {
    return this.findOne({id: contactId});
  }

  saveContact(contactEntity: ContactEntity): Promise<ContactEntity> {
    try {
      contactEntity.id = uuid();
      return this.save(contactEntity);
    } catch (e) {
      return null;
    }
  }

  updateContact(contactEntity: ContactEntity): Promise<ContactEntity> {
    try {
      return this.save(contactEntity);
    } catch (e) {
      return null;
    }
  }
}
