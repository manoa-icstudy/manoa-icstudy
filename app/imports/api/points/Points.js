import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const PointsCollection = new Mongo.Collection('PointsCollectionData');

const PointsCollectionDataSchema = new SimpleSchema({
  user: String,
  pointCount: Number,
});

PointsCollection.attachSchema(PointsCollectionDataSchema);

export { PointsCollection, PointsCollectionDataSchema };
