import { Form, Row, Col } from "react-bootstrap";
import type { Job } from "../jobTypes";
import { Editor } from "@tinymce/tinymce-react";

type DescProps = {
  job: Job;
  onJobChange: (next: Job) => void;
};

const Description = ({ job, onJobChange }: DescProps) => {
  return (
    <>
      <Form>
        <Row className="g-3 mt-2">
          <Col md={10}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="3" className="label">
                Internal Description
              </Form.Label>
              <Col>
                <Editor
                apiKey="kzubltanuccpwgeqydh5dklmyz2g9e634iq70n5vyhw5ud27"
                initialValue={job.internalDesc ?? ""}
                init={{
                  plugins: [ 'advlist','lists', 'autolink','link'],
                }}
                onChange={(e) => onJobChange({...job, internalDesc: e.target.value})}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-3 mt-2">
          <Col md={10}>
            <Form.Group as={Row} className="">
              <Form.Label column md="3" className="label">External Description</Form.Label>
              <Col>
                {/* <Form.Control
                  value={job.pubDesc ?? ""}
                  as="textarea"
                  rows={6}
                  onChange={(e) =>
                    onJobChange({ ...job, pubDesc: e.target.value })
                  }
                /> HAD TO BE CHANGED cause Form.Control does not do rich text editor. */} 
                <Editor
                apiKey="kzubltanuccpwgeqydh5dklmyz2g9e634iq70n5vyhw5ud27"
                initialValue={job.pubDesc ?? ""}
                init={{
                  plugins: [ 'advlist','lists', 'autolink','link'],
                }}
                onChange={(e) => onJobChange({...job, pubDesc: e.target.value})}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Description;
