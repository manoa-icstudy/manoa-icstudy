import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The SessionsCollection. It encapsulates state and variable values for stuff.
 */
class FeedbackCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FeedbackCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      experience: {
        type: String,
        allowedValues: ['Good', 'Bad', 'Neutral'],
        defaultValue: 'Good',
      },
      description: String,
      overallThoughts: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the SessionsCollection.
 * @type {FeedbackCollection}
 */
export const Feedbacks = new FeedbackCollection();
