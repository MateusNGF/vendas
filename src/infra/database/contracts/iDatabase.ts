export abstract class iDatabase {
  abstract connect(): Promise<void>;
  abstract close(): Promise<void>;
  abstract getDatabase() : any
}
