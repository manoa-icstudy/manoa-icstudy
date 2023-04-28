import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Feedbacks } from '../../api/feedback/Feedback';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  experience: {
    type: String,
    allowedValues: ['Good', 'Bad', 'Neutral'],
    defaultValue: 'Good',
  },
  feedback: {
    type: String,
    allowedValues: ['User Home Page', 'Create Study Seesion', 'Landing Page', 'Calendar', 'Study Session List'],
    defaultValue: 'User Home Page',
  },
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the CreateFeedback page for adding a document. */
const CreateFeedback = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { experience, feedback, description } = data;
    Feedbacks.collection.insert(
      { experience, feedback, description },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Feedback recieved', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="create-feedback" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Feedback</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <SelectField id="experience-field" name="experience" />
                <SelectField id="feedback-field" name="feedback" />
                <LongTextField id="description-field" name="description" />
                <SubmitField id="submit-field" value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateFeedback;
