import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @ManyToOne(() => Company, (company) => company.collaborators, { eager: true })
  company: Company;

  @Column()
  companyId?;
}
