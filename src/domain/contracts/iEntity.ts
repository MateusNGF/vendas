import { ObjectManager } from "../utils";

export abstract class iEntity {
    public readonly id?: any = null;
    public readonly archived_date?: Date = null;
    public readonly created_at?: Date = new Date();
    public readonly updated_at?: Date = new Date();
  
    constructor(entity : iEntity){
      ObjectManager.assing(this, entity)
    }
}
  