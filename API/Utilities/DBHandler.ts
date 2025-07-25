// Imports
import { MongoClient, Database, FindOptions } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

// MongoDB Handler
export class DBHandler {
  private mongoDBName = Deno.env.get('MONGO_DB');
  private mongoUri = Deno.env.get('MONGO_URI');

  private client!: MongoClient;
  private database!: Database;

  constructor() {
    // Initialize
    if ( !this.mongoUri ) {
      throw new Error('MONGO_URI not found in environment variables.');
    }

    this.client = new MongoClient();

    this.initialize().then(( result ) => {
      if ( !result ) {
        console.error( "MongoDB connection error. Please check your environment variables." );
      }
      else {
        console.log('MongoDB connected.');
      }
    });
  }

  private async initialize() {
    try {
      await this.client.connect( this.mongoUri );
    }
    catch ( e: unknown ) {
      console.error('Failed to connect to MongoDB:', e );
      return false;
    }

    if ( !this.mongoDBName ) {
      console.error('MONGO_DB_NAME not found in environment variables.');
      return false;
    }

    this.database = this.client.database( this.mongoDBName );

    return true;
  }

  public async selectOneById( collection: string, docId: number | string ) {
    return await this.database.collection( collection ).findOne( { id: docId });
  }

  public async selectOneByFilter( collection: string, filter: object ) {
    return await this.database.collection( collection ).findOne( filter );
  }

  public selectMany( collection: string, query: object, filter: FindOptions ) {
    return this.database.collection( collection ).find( query, filter ).toArray();
  }

  public async insertOne( collection: string, doc: object ) {
    return await this.database.collection( collection ).insertOne( doc );
  }

  public async updateOne( collection: string, filter: object, update: object ) {
    return await this.database.collection( collection ).updateOne( filter, update );
  }

  // Close
  public close() {
    this.client.close();
  }
}