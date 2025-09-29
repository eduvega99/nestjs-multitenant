import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenants', { schema: 'public' })
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  name: string;
}
