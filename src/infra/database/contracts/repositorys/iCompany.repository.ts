import { UserEntity } from "../../../../domain/entities";
import { CompanyEntity } from "../../../../domain/entities/company.entity";
import { BaseRepository } from ".";

export interface iCompanyRepository extends BaseRepository<CompanyEntity> {
    create(company : Partial<CompanyEntity>, options?: BaseRepository.QueryOptions) : Promise<Pick<UserEntity, 'company_id'>>
}