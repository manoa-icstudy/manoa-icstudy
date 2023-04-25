import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The SessionsCollection. It encapsulates state and variable values for stuff.
 */
class PointsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PointsCollection';
    this.owner = 'UserSessionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      pointCount: Number,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.owner}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.publicPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the SessionsCollection.
 * @type {PointsCollection}
 */
export const Points = new PointsCollection();
