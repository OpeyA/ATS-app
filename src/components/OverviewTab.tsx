import { Row, Col, Form } from "react-bootstrap";
import type { Job } from "../jobTypes";

type Props = {
  job: Job;
  onJobChange: (next: Job) => void;
};

const formatDate = (stringDate: string) => {
  return new Date(stringDate).toLocaleDateString();
};
//console.log(formatDate("2025-09-05T10:40:00Z"));

const Overview = ({ job, onJobChange }: Props) => {
  return (
    <Form>
      <Row className="g-3 mt-2">
        {/* Column1 */}
        <Col md={4}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4" className="label">
              Created Date
            </Form.Label>
            <Col>
              <Form.Control value={formatDate(job.createdDate)} readOnly />
            </Col>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4" className="label px-2">
              Modified Date
            </Form.Label>
            <Col>
              <Form.Control value={formatDate(job.modifiedDate)} />
            </Col>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4" className="label px-2">
              Kickoff Date
            </Form.Label>
            <Col>
              <Form.Control
                type="date"
                value={job.kickOffDate ?? ""}
                onChange={(e) =>
                  onJobChange({ ...job, kickOffDate: e.target.value })
                }
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3 mt-2">
        {/* Column1 */}
        <Col md={4}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4" className="label">
              Owner
            </Form.Label>
            <Col>
              <Form.Control
                defaultValue={job.owner?.name ?? ""}
                placeholder="Search user..."
              />
            </Col>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4" className="label">
              Assignee
            </Form.Label>
            <Col>
              <Form.Control
                defaultValue={job.assignee?.name ?? ""}
                placeholder="Search user..."
              />
            </Col>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3" className="label">
              Status
            </Form.Label>
            <Col>
              <Form.Select
                value={
                  job.status
                    ? "Accepting Candidates"
                    : "Not Accepting Candidates"
                }
                onChange={() =>
                  onJobChange({
                    ...job,
                    status: !job.status, //e.target.value === 'Accepting Candidates'
                  })
                }
              >
                <option value="Accepting Candidates">
                  Accepting Candidates
                </option>
                <option value="Not Accepting Candidates">
                  Not Accepting Candidates
                </option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3 mt-2">
        <Col md={4}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4" className="label">
              Priority
            </Form.Label>
            <Col>
              <Form.Select
                value={job.priority}
                onChange={(e) =>
                  onJobChange({
                    ...job,
                    priority: e.target.value as Job["priority"],
                  })
                }
              >
                <option value="Cold">Cold</option>
                <option value="Warm">Warm</option>
                <option value="Hot">Hot</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4" className="label">
              Published
            </Form.Label>
            <Col md="2">
              <Form.Check
                className="mt-2"
                type="switch"
                checked={job.isPublished}
                onChange={(e) =>
                  onJobChange({ ...job, isPublished: e.currentTarget.checked })
                }
              />
            </Col>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3" className="label">
              Opened
            </Form.Label>
            <Col md="2">
              <Form.Check
                className="mt-2"
                type="switch"
                checked={job.isOpen}
                onChange={(e) =>
                  onJobChange({ ...job, isOpen: e.currentTarget.checked })
                }
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Overview;
