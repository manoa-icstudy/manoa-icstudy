import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The SessionsCollection. It encapsulates state and variable values for stuff.
 */

const PointsCollection = new Mongo.Collection('PointsCollectionData');

/** Define a schema to specify the structure of each document in the collection. */
const PointsCollectionDataSchema = new SimpleSchema({
  user: String,
  pointCount: Number,
});

/** Attach the schema to the collection. */
PointsCollection.attachSchema(PointsCollectionDataSchema);

/** Make these objects available to others. */
export { PointsCollection, PointsCollectionDataSchema };
