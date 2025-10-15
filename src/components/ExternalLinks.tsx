import type { Job, ExternalLink } from "../jobTypes";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { useState } from "react";

type LinksProps = {
  job: Job;
  onJobChange: (next: Job) => void;
};

//generate a unique ID for jobbaord post
const recordID = () => {
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID
    : Math.random().toString(36).slice(2);
};

const ExternalLinks = ({ job, onJobChange }: LinksProps) => {
  const [link, setLink] = useState<ExternalLink>({
    id: String(recordID()),
    name: "",
    url: "",
  });

  const change =
    <K extends keyof ExternalLink>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setLink({ ...link, [key]: e.target.value });

  const addLink = () => {
    if (!link.name.trim() || !link.url.trim()) return;
    onJobChange({
      ...job,
      externalLinks: [...(job.externalLinks ?? []), link],
    });
    setLink({ id: String(recordID()), name: "", url: "" });
  };
  const updateLink = (indx: number, lnk: ExternalLink) => {
    const next = [...(job.externalLinks ?? [])];
    next[indx] = lnk;
    onJobChange({ ...job, externalLinks: next });
  };

  const deleteLink = (indx: number) => {
    onJobChange({
      ...job,
      externalLinks: job.externalLinks?.filter((_, i) => i !== indx),
    });
  };
  return (
    <div className="m-2">
      <Form>
        <InputGroup className="my-4">
          <InputGroup.Text className="rounded">
            Job Board + Link
          </InputGroup.Text>
          <Form.Control
            className="rounded"
            placeholder="Name"
            value={link.name}
            onChange={change("name")}
          />
          <Form.Control
            className="rounded"
            placeholder="https://…"
            value={link.url}
            onChange={change("url")}
          />
          <Button className="bgColor rounded" onClick={addLink}>
            Add
          </Button>
        </InputGroup>
      </Form>
      <Table responsive size="sm"  className="p-3 mb-3 ">
        <thead>
          <tr>
            <th className="label p-2">Name</th>
            <th className="label p-2">URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(job.externalLinks ?? []).map((lnk, i) => (
            <tr key={lnk.id}>
              <td>
                <Form.Control
                  value={lnk.name}
                  onChange={(e) =>
                    updateLink(i, { ...lnk, name: e.target.value })
                  }
                />
              </td>
              <td>
                <Form.Control
                  value={lnk.url}
                  onChange={(e) =>
                    updateLink(i, { ...lnk, url: e.target.value })
                  }
                />
              </td>
              <td className="text-end">
                <Button
                  className="p-2"
                  variant="danger"
                  size="sm"
                  onClick={() => deleteLink(i)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExternalLinks;
