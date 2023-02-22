import { Collection, Db, Filter } from "mongodb";
import { ProductEntity } from "src/domain/entities";
import { generateID } from "../../../../domain/utils";
import { iProductRepository } from "../../contracts/repositorys/iProduct.repository";

export class ProductRepository implements iProductRepository {

    constructor(
        private readonly database: Db,
        private readonly colletion: Collection<ProductEntity>
    ) {}

    listProduct(filter: iProductRepository.FilterForList): Promise<ProductEntity[]> {
        let where: Filter<ProductEntity>;
          if (filter) {
      
            if (filter.text) {
              where = {
                ...where,
                $text: { $search: filter.text },
              };
            }
          }
      
          return this.colletion.find(where).limit(filter.limit ?? 50).skip(filter.offset ?? 0).toArray();
    }


    validDuplicatedProduct(produt: Partial<ProductEntity>): Promise<ProductEntity> {
        return this.findOneWithProjection({ name : produt.name })
    }

    async create(product: ProductEntity): Promise<{ id: string; }> {
        const generateId = product.id ? product.id : generateID()

        const inserted = await this.colletion.insertOne({
            ...product,
            id : generateId
        })

        if (inserted.insertedId){
            return {
                id : generateId
            }
        }
    }
    async archiveProduct(productId: string): Promise<boolean> {
        const result = await this.colletion.updateOne({ id : productId }, { $set : {archived_date : new Date()} })
        if (result.modifiedCount>0){
            return true;
        }
        return false
    }
    
    async unarchiveProduct(productId: string): Promise<boolean> {
        const result = await this.colletion.updateOne({ id : productId }, { $set : {archived_date : null} })
        if (result.modifiedCount>0){
            return true;
        }
        return false
    }

    findById(id: string): Promise<ProductEntity> {
        return this.findOneWithProjection({ id })
    } 


    private findOneWithProjection(filter: Filter<ProductEntity>): Promise<ProductEntity> {
        return this.colletion.findOne(filter, { projection: { _id: 0 } })
    }

}