import { Form, Row, Col, Badge, Button } from "react-bootstrap";
import type { Job, ContactRef, CompanyRef } from "../jobTypes";

type CompanyProps = {
  job: Job;
  companies: CompanyRef[];
  onCompanyChange: (companyId?: string, companyName?: string) => void;
  onContactChange: (contactId?: string, contactName?: string) => void;
  onJobChange: (next: Job) => void;
};

//Create the badges and input for the benefits, company and contact of company
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
  //on key event 'Enter', trim and add that value to the values variable
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
        as="textarea"
        rows={3}
        placeholder={placeholder ?? "Type and press Enter"}
        onKeyDown={onKeyDown}
      />
      {/* Map all the values to a badge element */}
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

const Company = ({
  job,
  onCompanyChange,
  companies,
  onContactChange,
  onJobChange,
}: CompanyProps) => {

  //Get selected company
  const selectedCompany: CompanyRef | undefined = companies.find(
    (company) => company.id === job.companyID
  );
  //get the slected companies contacts to be dsiplayed.
  const contactOptions: ContactRef[] = selectedCompany?.contacts ?? [];
  const voidCompany = () => {
    // Voiding company mcoids contact so clear both fields.)
    onCompanyChange(undefined, undefined);
    onContactChange(undefined, undefined);
  };

  //Just to void contact 
  const voidContact = () => {
    onContactChange(undefined, undefined);
  };

  const addBenefit = (val: string) =>
    onJobChange({ ...job, benefits: [...job.benefits, val] });
  const removeBenefit = (val: string) =>
    onJobChange({ ...job, benefits: job.benefits?.filter((b) => b !== val) });

  return (
    <>
      <Form >
        <Row className="g-3 mt-2">
          <Col md={4}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="3" className="label">
                Company
              </Form.Label>
              <Col>
                <Form.Select
                  value={job.companyID ?? ""}
                  onChange={(e) => {
                    const id = e.target.value || undefined;
                    const name = id
                      ? companies.find((c) => c.id === id)?.name
                      : undefined;
                    onCompanyChange(id, name);
                    onContactChange(undefined, undefined);
                  }}
                >
                  <option value="">Select company</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
                {job.companyID && (
                  <div className="d-flex gap-2 flex-wrap mt-2">
                    <Badge bg="dark" as="a" className="p-2">
                      {job.companyName ??
                        selectedCompany?.name ??
                        job.companyID}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={voidCompany}
                        className="ms-1 py-0"
                      >
                        x
                      </Button>
                    </Badge>
                  </div>
                )}
              </Col>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="3" className="label">
                Contact
              </Form.Label>
              <Col>
                <Form.Select
                  value={job.contactID ?? ""}
                  onChange={(e) => {
                    const id = e.target.value || undefined;
                    const name = id
                      ? contactOptions.find((x) => x.id === id)?.name
                      : undefined;
                    onContactChange(id, name);
                  }}
                  disabled={!job.companyID}
                >
                  <option value="">Select contact</option>
                  {contactOptions.map((ct) => (
                    <option key={ct.id} value={ct.id}>
                      {ct.name}
                    </option>
                  ))}
                </Form.Select>
                {job.contactID && (
                  <div className="d-flex gap-2 flex-wrap mt-2">
                    <Badge bg="dark" className="p-2">
                      {job.contactName ?? job.contactID}
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-1 py-0"
                        onClick={voidContact}
                      >
                        &times;
                      </Button>
                    </Badge>
                  </div>
                )}
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-3 mt-1"></Row>
        <Row className="g-3 mt-1">
          <Col md={4}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="3" className="label">
                Benefits
              </Form.Label>
              <Col>
                <ChipInput
                  values={job.benefits}
                  onAdd={addBenefit}
                  onRemove={removeBenefit}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Company;
