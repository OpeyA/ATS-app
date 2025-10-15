import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobPage from "./components/JobPage";
import type { Job } from "./jobTypes";
import { Spinner, Alert} from "react-bootstrap";
import { recordID } from "./components/generateID";

function JobRoute() {
  //state is initially set to JOb interface or null
  const { id } = useParams(); // id for router is filename
  const [job, setJob] = useState<Job | null>(null);
  const [error, setErorr] = useState<string | null>(null); // for erro handling

  //Gen ID is mainly for creating an Id for the notes because I ran into issue of all notes being deleted instead of specific note hence they needed an ID. RecordID() is a helper function that created the IDs
  function genID(json: Job): Job {
    const notes = (json.notes ?? []).map(n => ({
      ...n,
      id: n.id ?? recordID(),    
    }));
    return { ...json, notes };
  }

  //filename based on the id or null
  const filename =
    id === "1" ? "JobOne.json" : id === "2" ? "JobMulti.json" : null;

  //console.log(filename);

  //fetch the json file and return it as a Job type
  useEffect(() => {
    if (!filename) {
      setErorr("No job ID");
    } else {
      fetch(`${import.meta.env.BASE_URL}data/${filename}`)
        .then((res) => {
          if (!res.ok)
            throw new Error(`HTTP ${res.status} Could not fetch the job`);
          return res.json();
        })
        .then((data: Job) => setJob(genID(data)))
        .catch((err) => setErorr(String(err)));
    }
  }, [filename]);

  //Throw errors if fecth fails or if there is no Job record available
  if (error)
    return (
      <Alert variant="danger" className="m-3">
        Failed to load: {error}
      </Alert>
    );
  if (!job)
    return (
      <div className="m-3">
        <Spinner animation="border" size="sm" /> Loading…
      </div>
    );

    //return the parsed json job record and make it the initial state for JOb page. 
  return (
    <>
      <JobPage initialJob={job} />
    </>
  );
}

export default JobRoute;
