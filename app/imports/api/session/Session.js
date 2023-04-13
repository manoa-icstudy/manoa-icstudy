import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The SessionsCollection. It encapsulates state and variable values for stuff.
 */
class SessionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SessionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      date: String,
      owner: String,
      description: String,
      icsclass: {
        type: String,
        allowedValues: ['ICS 101', 'ICS 111', 'ICS 211', 'ICS 212', 'ICS 311'],
        defaultValue: 'ICS 101',
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the SessionsCollection.
 * @type {SessionsCollection}
 */
export const Sessions = new SessionsCollection();
