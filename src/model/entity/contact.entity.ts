import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity('contacts')
export class ContactEntity {

    @PrimaryColumn('varchar', {
        nullable: false,
        length: 50,
        name: 'id',
        })
    id: string;

    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'first_name',
        })
    firstName: string;

    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'last_name',
        })
    lastName: string;

    @Column('int', {
        nullable: false,
        name: 'age',
        })
    age: number;

    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'photo',
        })
    photo: string | null;

}
