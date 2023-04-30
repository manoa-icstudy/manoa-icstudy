import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Sessions } from '../../api/session/Session';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Sessions.schema);

const EditStudySession = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { owner: _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, doc } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Sessions.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.
  const submit = (data, formRef) => {
    const { name, location, date, icsclass, description } = data;
    Sessions.collection.update(
      _id,
      { $set: name, location, date, icsclass, description },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Session added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return ready ? (
    <Container className="py-3" id="edit-study-session">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Study Session</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} model={doc}>
            <Card>
              <Col className="m-3 mb-0">
                <Button href="/study-session-list" variant="primary">Back</Button>
              </Col>
              <Card.Body>
                <TextField name="name" id="edit-study-session-name" />
                <TextField name="location" id="edit-study-session-location" />
                <DateField name="date" showInlineError type="datetime-local" id="edit-study-session-date" />
                <SelectField name="icsclass" id="edit-study-session-icsclass" />
                <LongTextField name="description" id="edit-study-session-description" />
                <SubmitField value="Submit" id="edit-study-session-submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditStudySession;
