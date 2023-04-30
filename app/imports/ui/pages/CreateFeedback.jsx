import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Feedbacks } from '../../api/feedback/Feedback';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  experience: {
    type: String,
    allowedValues: ['Good', 'Bad', 'Neutral'],
    defaultValue: 'Good',
  },
  description: { type: String, label: 'Feedback' },
  overallThoughts: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the CreateFeedback page for adding a document. */
const CreateFeedback = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, experience, description, overallThoughts } = data;
    Feedbacks.collection.insert(
      { name, experience, description, overallThoughts },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Feedback received', 'success');
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
                <Row>
                  <Col>
                    <TextField id="name-field" name="name" />
                  </Col>
                  <Col>
                    <SelectField id="experience-field" name="experience" />
                  </Col>
                </Row>
                <Row><LongTextField id="description-field" name="description" help="Any areas for improvement?" /></Row>
                <Row><LongTextField id="overall-thoughts-field" name="overallThoughts" help="Tell us about your overall experience using Manoa ICStudy." /></Row>
                <Row><SubmitField id="submit-field" value="Submit" /></Row>
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
