import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity('tenants', { schema: 'public' })
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.tenant, { cascade: true })
  users?: User[];
}
