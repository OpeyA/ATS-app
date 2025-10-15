import type { Job } from "../jobTypes";
import { Button, ListGroup } from "react-bootstrap";

type NotesProps = {
  job: Job;
  onJobChange: (next: Job) => void;
  onAddNoteClick: () => void;
};

const formatDate = (stringDate: string) => {
  return new Date(stringDate).toLocaleDateString();
};

const Notes = ({ job, onJobChange, onAddNoteClick }: NotesProps) => {
  const deleteNote = (id: string) => {
    onJobChange({
      ...job,
      notes: (job.notes ?? []).filter((n) => n.id !== id),
    });
  };

  return (
    <>
      <div className="m-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-muted">
            Add notes via Actions menu or directly to this list.
          </div>
          <Button className="bgColor" onClick={onAddNoteClick}>
            Add Note
          </Button>
        </div>
        <ListGroup>
          {(job.notes ?? []).map((n) => (
            <ListGroup.Item
              key={n.id}
              className="d-flex justify-content-between align-items-start"
            >
              <div className="fw-semibold">
                {n.user.name} •{" "}
                <small className="text-muted">{formatDate(n.createdAt)}</small>
              </div>
              <div>{n.text}</div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteNote(n.id)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default Notes;
