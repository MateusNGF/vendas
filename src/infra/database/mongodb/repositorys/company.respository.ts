import { Collection } from "mongodb";
import { UserEntity } from "../../../../domain/entities";
import { CompanyEntity } from "../../../../domain/entities/company.entity";
import { generateID } from "../../../../domain/utils";
import { BaseRepository } from "../../contracts/repositorys";
import { iCompanyRepository } from "../../contracts/repositorys/iCompany.repository";

export class CompanyRepository implements iCompanyRepository {
    constructor(
      private readonly colletion: Collection<CompanyEntity>
    ) {}
    async create(incomingCompany: Partial<CompanyEntity>, options?: BaseRepository.QueryOptions): Promise<Pick<UserEntity, "company_id">> {
        const session = options && options.session ? options.session.get() :  null;

        const company = new CompanyEntity({
            ...incomingCompany,
            id : generateID()
        })
        
        const result = await this.colletion.insertOne(company, { session }) 
        if (result && result.acknowledged) return { company_id : company.id }
        return null
    }

    findById(id: string, options?: BaseRepository.QueryOptions): Promise<CompanyEntity> {
        const session = options && options.session ? options.session.get() :  null;
        return this.colletion.findOne({ id }, { session })
    }
}