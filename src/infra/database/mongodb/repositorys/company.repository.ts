import { Collection, Db, Filter } from 'mongodb';
import { generateID } from '../../../../domain/utils';
import { iMemoryCachedDriver } from '../../contracts';
import { iCompanyRepository } from '../../contracts/repositorys/iCompany.repository';
import { CompanyEntity } from 'src/domain/entities/company.entity';

export class CompanyRepository implements iCompanyRepository {
  private readonly _projection = { _id: 0 };
  constructor(private readonly colletion: Collection<CompanyEntity>, private readonly memoryCache: iMemoryCachedDriver.iManager) {}

  async create(company: CompanyEntity): Promise<{ id: string }> {
    const idGenerate = company.id ? company.id : generateID();

    const result = await this.colletion.insertOne({
      ...company,
      id: idGenerate,
    });

    if (result.acknowledged) {
      return {
        id: idGenerate,
      };
    }

    return null;
  }

  async findById(id: string): Promise<CompanyEntity> {
    let content = await this.memoryCache.get(id);
    if (content) return content;

    content = await this.colletion.findOne({ id }, { projection: this._projection });
    await this.memoryCache.set(content.associeted_id, content);
    return content;
  }

  async findByOnwer(user_id: string): Promise<Array<CompanyEntity>> {
    const content = this.colletion.find({ owner_id: user_id }, { projection: this._projection });
    return await content.toArray();
  }
}
