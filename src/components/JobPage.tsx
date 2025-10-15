import { milestones, type Job, type Note } from "../jobTypes";
import { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Badge,
  Navbar,
  Dropdown,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import Overview from "./OverviewTab";
import Details from "./DetailsTab";
import Description from "./Descriptions";
import Company from "./Company";
import Locations from "./Locations";
import ExternalLinks from "./ExternalLinks";
import Notes from "./Notes";
import { CompaniesData } from "../companiesData";
import { recordID } from "./generateID";
import logoUrl from '@/img/bearclaw-logo-inline.png';

//Type to hold the properties of the Job Page
type JobProps = {
  initialJob: Job;
};

function JobPage({ initialJob }: JobProps) {
  //initialize state from to be instail Job from
  const [job, setJob] = useState<Job>(initialJob);
  //Partially update and patch the record.
  const updateJob = (patch: Partial<Job>) => {
    setJob((job) => ({ ...job, ...patch }));
  };

  ///for the notes modal to set and modal initailly and the text
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const openNoteModal = () => setShowModal(true);
  const closeNoteModal = () => setShowModal(false);

  //for the highlight color
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedColor(e.target.value);

  const addNote = () => {
    if (!text.trim()) return;
    const note: Note = {
      id: recordID(),
      text: text.trim(),
      user: job.owner ?? { id: String(recordID()), name: "" },
      createdAt: new Date().toISOString(),
    };
    console.log(note);
    setJob((j) => ({ ...j, notes: [...(j.notes ?? []), note] }));
    setText("");
    setShowModal(false);
  };

  const priorityVariant =
    job.priority === "Cold"
      ? "info"
      : job.priority === "Warm"
      ? "warning"
      : "danger";

  const jobMilestone = job.currMilestone;

  const connector = (
    <StepConnector
      classes={{ root: "customConnector", line: "customConnector-line" }}
    />
  );
  return (
    <>
      <Container fluid className="py-3 container">
        {/* Sticky header */}
        <Navbar
          fixed="top"
          className="justify-content-between px-3 py-2 bg-dark border-top"
        >
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary">
                Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={openNoteModal}>Add Note</Dropdown.Item>
                <Dropdown.Item onClick={openNoteModal}>
                  Add to Workflow
                </Dropdown.Item>
                <Dropdown.Item onClick={openNoteModal}>
                  Send Email
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}img/bearclaw-logo-inline.png`}
            alt="Bear Claw logo"
            width="100"
            height="27"
            className="d-inline-block align-text-top"
          />
          <div>
            <Button
              variant="outline-secondary"
              className="me-2"
              onClick={closeNoteModal}
            >
              Cancel
            </Button>
            <Button variant="outline-primary">Save</Button>
          </div>
        </Navbar>

        {/**The job title,record and all the important, quick view variables are stored at the top of the job record page */}
        <div className="d-flex align-items-center gap-2 justify-content-between my-3">
          <Col md={4}>
            <Form.Control
              className="form-control"
              value={job.title}
              onChange={(e) => updateJob({ title: e.target.value })}
              aria-label="Job title"
            />
          </Col>
          <small className="text-muted">{job.id}</small>
          <Badge
            style={{ fontSize: ".85rem", fontWeight: "600" }}
            className="rounded-pill"
            bg={job.status ? "success" : "danger"}
          >
            {job.status ? "Accepting Candidates" : "Not Accepting Candidates"}
          </Badge>
          <Badge
            style={{ fontSize: ".85rem", fontWeight: "600" }}
            className="rounded-pill"
            bg={job.isOpen ? "success" : "danger"}
          >
            {job.isOpen ? "Open" : "Closed"}
          </Badge>
          <Badge
            style={{ fontSize: ".85rem", fontWeight: "600" }}
            className="rounded-pill"
            bg={job.isPublished ? "success" : "danger"}
          >
            {job.isPublished ? "Published" : "Not Publised"}
          </Badge>
          <Badge
            style={{ fontSize: ".85rem", fontWeight: "600" }}
            className="rounded-pill"
            bg={priorityVariant}
          >
            {job.priority}
          </Badge>
        </div>

        {/* stepper milestone */}
        <div className="my-3 border-top">
          <Box className="my-3 Tab" sx={{ width: "100%" }}>
            <Stepper
              className="py-3"
              activeStep={milestones.findIndex((s) => s === jobMilestone)}
              alternativeLabel
              connector={connector}
            >
              {(milestones ?? []).map((m, i) => (
                <Step key={i + 1}>
                  <StepLabel className="customStep"> {m}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>

        {/* display misltone and highlight fields  */}
        <div>
          <Form>
            <Row className="g-3 mt-2 justify-content-center">
              <Col md="auto">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column md="auto" className="label text-md-end">
                    Milestone
                  </Form.Label>
                  <Col md="auto">
                    <Form.Select
                      value={job.currMilestone}
                      onChange={(e) =>
                        setJob((j) => ({
                          ...j,
                          currMilestone: e.target.value as Job["currMilestone"],
                        }))
                      }
                    >
                      <option value="Submission">Submission</option>
                      <option value="Client Submission">
                        Client Submission
                      </option>
                      <option value="Interview">Interview</option>
                      <option value="Offer Accepted">Offer Accepted</option>
                      <option value="Offer Extended">Offer Extended</option>
                      <option value="Start Date">Start Date</option>
                      <option value="Archive">Archive</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col md="auto">
                <Form.Group as={Row} className="mb-3 text-center">
                  <Form.Label column md="auto" className="label text-md-end">
                    Highlight
                  </Form.Label>
                  <Col md="auto">
                    <Form.Select onChange={handleColorChange}>
                      <option value="">None</option>
                      <option value="blue">Blue</option>
                      <option value="orange">Orange</option>
                      <option value="pink">Pink</option>
                      <option value="purple">Purple</option>
                    </Form.Select>
                  </Col>
                  <Col md="auto" className="border rounded">
                    <div
                      className="star mt-1"
                      style={{
                        backgroundColor: selectedColor,
                        width: "2rem",
                        height: "1.9rem",
                      }}
                    ></div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>

        {/* nav tabs */}
        <div className="mt-4">
          <Tabs defaultActiveKey="overview" justify>
            <Tab eventKey="overview" title="Overview">
              <Overview job={job} onJobChange={setJob}></Overview>
            </Tab>
            <Tab eventKey="details" title="Details">
              <Details job={job} onJobChange={setJob}></Details>
            </Tab>
            <Tab eventKey="descriptions" title="Descriptions">
              <Description job={job} onJobChange={setJob}></Description>
            </Tab>
            <Tab eventKey="company" title="Company">
              <Company
                job={job}
                companies={CompaniesData}
                onCompanyChange={(id, name) =>
                  setJob((j) => ({
                    ...j,
                    companyID: id,
                    companyName: name,
                    contactID: undefined,
                    contactName: undefined,
                  }))
                }
                onContactChange={(id, name) =>
                  setJob((j) => ({ ...j, contactID: id, contactName: name }))
                }
                onJobChange={setJob}
              ></Company>
            </Tab>
            <Tab eventKey="locations" title="Locations">
              <Locations job={job} onJobChange={setJob}></Locations>
            </Tab>
            <Tab eventKey="externallinks" title="Links">
              <ExternalLinks job={job} onJobChange={setJob}></ExternalLinks>
            </Tab>
            <Tab eventKey="notes" title="Notes">
              <Notes
                job={job}
                onJobChange={setJob}
                onAddNoteClick={openNoteModal}
              ></Notes>
            </Tab>
          </Tabs>
        </div>

        {/*Modal WIndow that opens with action menu and as note action*/}
        <Modal show={showModal} onHide={closeNoteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add note here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label> Note</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={closeNoteModal}>
              Cancel
            </Button>
            <Button className="bgColor" onClick={addNote}>
              Save Note
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default JobPage;
