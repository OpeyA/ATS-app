import type { Job, Location } from "../jobTypes";
import { Button, Form } from "react-bootstrap";
import { useCallback } from "react";

type LocationProps = {
  job: Job;
  onJobChange: (next: Job) => void;
};

//generate a unique ID for each Location
const recordID = () => {
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID
    : Math.random().toString(36).slice(2);
};

function LocationCard({
  loc,
  onChange,
  onRemove,
  index,
}: {
  loc: Location;
  onChange: (l: Location) => void;
  onRemove: () => void;
  index: number;
}) {
  const change =
    <K extends keyof Location>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      onChange({ ...loc, [key]: e.target.value });

  return (
    <div className="border rounded p-3 mt-3 locationCard">
      <div className="d-flex justify-content-end mb-2">
        {/* <Form.Label style={{color: 'white'}}> Location #{index + 1}</Form.Label> */}
        <Button variant="danger" size="sm" onClick={onRemove}>
          &times;
        </Button>
      </div>
      <Form className="row g-3">
        <Form.Group className="col-md-12">
          <Form.Label className="label"> Street </Form.Label>
          <Form.Control value={loc.street} onChange={change("street")} />
        </Form.Group>
        <Form.Group className="col-md-6">
          <Form.Label className="label"> City </Form.Label>
          <Form.Control value={loc.city} onChange={change("city")} />
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Label className="label"> State </Form.Label>
          <Form.Control value={loc.state} onChange={change("state")} />
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Label className="label"> Zip Code </Form.Label>
          <Form.Control value={loc.zipCode} onChange={change("zipCode")} />
        </Form.Group>
      </Form>
    </div>
  );
}

const Locations = ({ job, onJobChange }: LocationProps) => {
  const addLocation = () =>
    onJobChange({
      ...job,
      locations: [
        ...job.locations,
        {
          id: String(recordID()),
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
      ],
    });

  const updateLocation = useCallback(
    (indx: number, loc: Location) => {
      const next = [...job.locations];
      next[indx] = loc;
      onJobChange({ ...job, locations: next });
    },
    [job, onJobChange]
  );

  const deleteLocation = (indx: number) => {
    onJobChange({
      ...job,
      locations: job.locations.filter((_, i) => i !== indx),
    });
  };

  return (
    <div className="m-2">
      {job.locations.map((loc, i) => (
        <LocationCard
          key={loc.id}
          index={i}
          loc={loc}
          onChange={(next) => updateLocation(i, next)}
          onRemove={() => deleteLocation(i)}
        />
      ))}
      <Button className="bgColor mt-2" onClick={addLocation}>
        Add another location
      </Button>
    </div>
  );
};

export default Locations;
