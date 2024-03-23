import { CompanyEntity } from "src/domain/entities/company.entity";
import { BaseRepository } from ".";


export interface iCompanyRepository extends BaseRepository<CompanyEntity> {
    create(company: Partial<CompanyEntity>): Promise<{ id: string }>;
    findByOnwer(user_id: string): Promise<Array<CompanyEntity>>;
    findById(id: string): Promise<CompanyEntity>;
  }
  