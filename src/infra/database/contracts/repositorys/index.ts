import { iEntity } from "src/domain/contracts";

export interface BaseRepository<Schema extends iEntity> {
    findById(id : string) : Promise<Schema>
}