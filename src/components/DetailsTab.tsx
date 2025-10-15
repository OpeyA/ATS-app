import { useMemo, useState } from "react";
import { Form, Row, Col, Badge, Button } from "react-bootstrap";
import type { Job, SkillKind } from "../jobTypes";
import { computeGrossRevenue } from "../grossRevCalculation";
import { recordID } from "./generateID";

type detailProps = {
  job: Job;
  onJobChange: (next: Job) => void;
};

function ChipInput({
  values,
  onAdd,
  onRemove,
  placeholder,
}: {
  values: string[];
  onAdd: (val: string) => void;
  onRemove: (val: string) => void;
  placeholder?: string;
}) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = (e.currentTarget.value || "").trim();
      if (val) onAdd(val);
      e.currentTarget.value = "";
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Control
        placeholder={placeholder ?? "Type and press Enter"}
        onKeyDown={onKeyDown}
      />
      <div className="d-flex gap-2 flex-wrap mt-2">
        {values.map((v) => (
          <Badge key={v} bg="dark" className="p-2 m-1">
            {v}{" "}
            <Button
              aria-label={`Remove ${v}`}
              onClick={() => onRemove(v)}
              size="sm"
              variant="danger"
              className="ms-1 py-0"
            >
              ×
            </Button>
          </Badge>
        ))}
      </div>
    </Form.Group>
  );
}

const Details = ({ job, onJobChange }: detailProps) => {
  //calculate gross rev from helper function
  const grossRevenue = useMemo(
    () => computeGrossRevenue(job.salary),
    [job.salary]
  );
  //Skill and type of sskill need to staored to style hard skills differently
  const [skillName, setskillName] = useState("");
  const [skillKind, setskillKind] = useState<SkillKind>("hard");

  const addSkill = () => {
    const name = skillName.trim();
    if (!name) return;
    onJobChange({
      ...job,
      skills: [
        ...job.skills,
        { id: recordID(), name: name, kind: skillKind },
      ],
    });
    setskillName("");
  };

  const addCert = (val: string) =>
    onJobChange({ ...job, certifications: [...job.certifications, val] });
  const removeCert = (val: string) =>
    onJobChange({
      ...job,
      certifications: job.certifications.filter((cert) => cert !== val),
    });

  return (
    <>
      <Form className="">
        <Row className="g-3 mt-2">
          <Col md={4}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="3" className="label">
                Salary
              </Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  value={job.salary ?? ""}
                  onChange={(e) =>
                    onJobChange({
                      ...job,
                      salary: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  min={0}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group as={Row} className="mb-3 ">
              <Form.Label column md="5" className="label">
                Gross Revenue
              </Form.Label>
              <Col>
                <Form.Control value={grossRevenue ?? ""} readOnly disabled />
              </Col>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="5" className="label">
                Min Experience
              </Form.Label>
              <Col md={3}>
                <Form.Control
                  defaultValue={job.minExperience ?? ""}
                  type="number"
                  min={0}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="3" className="label">
                Industry
              </Form.Label>
              <Col>
                <Form.Control
                  value={job.industry ?? ""}
                  onChange={(e) =>
                    onJobChange({ ...job, industry: e.target.value })
                  }
                />
              </Col>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="5" className="label">
                Modality
              </Form.Label>
              <Col>
                <Form.Select
                  value={job.modality}
                  onChange={(e) =>
                    onJobChange({
                      ...job,
                      modality: e.target.value as Job["modality"],
                    })
                  }
                >
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">Onsite</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3 mt-4 border-top">
          <Col md={6}>
            <Form.Group as={Row}>
              <Form.Label column md="3" className="label">
                Skills
              </Form.Label>
              <Col md={8}>
                <Form.Control
                  placeholder="Type a skill, Select a type and Press Enter"
                  value={skillName}
                  onChange={(e) => setskillName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                ></Form.Control>
                <Col md={3}>
                  <Form.Select
                    className="mt-2"
                    value={skillKind}
                    onChange={(e) => {
                      setskillKind(e.target.value as SkillKind);
                    }}
                  >
                    <option value="hard">Hard</option>
                    <option value="soft">Soft</option>
                  </Form.Select>
                </Col>
                <div className="d-flex gap-2 flex-wrap mt-2">
                  {job.skills.map((s) => (
                    <Badge
                      className="p-2 m-1"
                      key={s.id}
                      style={{fontSize:".85rem"}}
                      bg={s.kind === "hard" ? "success" : "dark"}
                    >
                      {s.name}
                      <Button
                        size="sm"
                        variant="danger"
                        className="ms-1 py-0"
                        onClick={() =>
                          onJobChange({
                            ...job,
                            skills: job.skills.filter((x) => x.id !== s.id),
                          })
                        }
                        aria-label={`Remove ${s.name}`}
                      >
                        ×
                      </Button>
                    </Badge>
                  ))}
                </div>
              </Col>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="3" className="label p-1">
                Certifications
              </Form.Label>
              <Col md={8}>
                <ChipInput
                  values={job.certifications}
                  onAdd={addCert}
                  onRemove={removeCert}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Details;
