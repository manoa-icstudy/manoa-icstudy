import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Feedbacks } from '../../api/feedback/Feedback';
import FeedBacks from '../components/FeedBacks';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const FeedBacksList = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, feedbacks } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Feedbacks.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Feedbacks.collection.find({}).fetch();
    return {
      feedbacks: stuffItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Feedback List</h2>
          </Col>
          <Container>
            <Table striped bordered hover style={{ borderCollapse: 'collapse', overflowX: 'scroll' }}>
              <thead style={{ display: 'block' }}>
                <tr>
                  <th style={{ minWidth: '269px', height: '25px', border: 'dashed 1px lightblue', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '269px' }}>Name</th>
                  <th style={{ minWidth: '269px', height: '25px', border: 'dashed 1px lightblue', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '269px' }}>Experience</th>
                  <th style={{ minWidth: '269px', height: '25px', border: 'dashed 1px lightblue', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '269px' }}>Description</th>
                  <th style={{ minWidth: '269px', height: '25px', border: 'dashed 1px lightblue', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '269px' }}>Overall Thoughts</th>
                </tr>
              </thead>
              <tbody style={{ display: 'block', overflowX: 'hidden', overflowY: 'scroll', height: '75vh' }}>
                {feedbacks.map((feedback) => <FeedBacks key={feedback._id} feedback={feedback} />)}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default FeedBacksList;
