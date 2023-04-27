import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const PointsCollection = new Mongo.Collection('PointsCollectionData');

const PointsCollectionDataSchema = new SimpleSchema({
  owner: String,
  pointCount: String,
});

PointsCollection.attachSchema(PointsCollectionDataSchema);

export { PointsCollection, PointsCollectionDataSchema };