import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Sessions } from '../../api/session/Session';
import { icsCourses } from '../../api/course/courses';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: { type: String, label: 'Study Session Name' },
  location: String,
  date: {
    type: Date,
    label: 'Date and Time',
    defaultValue: new Date(),
  },
  icsclass: {
    type: String,
    label: 'ICS Class',
    allowedValues: icsCourses,
    defaultValue: 'ICS 101',
  },
  description: { type: String, label: 'Description' },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const CreateStudySession = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const currDate = new Date();
    const { name, location, date, icsclass, description, createDate = currDate } = data;
    const owner = Meteor.user().username;
    const participant = [owner];
    Sessions.collection.insert(
      { name, location, date, icsclass, description, createDate, owner, participant },
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

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3" id="create-study-session">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Study Session</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row><TextField name="name" id="create-study-session-name" /></Row>
                <Row><TextField name="location" id="create-study-session-location" /></Row>
                <Row>
                  <Col>
                    <DateField name="date" showInlineError type="datetime-local" id="create-study-session-date" />
                  </Col>
                  <Col>
                    <SelectField name="icsclass" id="create-study-session-icsclass" />
                  </Col>
                </Row>
                <Row><LongTextField name="description" id="create-study-session-description" help="Give more information about your study session" showInlineError /></Row>
                <Row><SubmitField value="Submit" id="create-study-session-submit" /></Row>
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateStudySession;
