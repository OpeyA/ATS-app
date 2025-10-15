import { createBrowserRouter, Outlet } from "react-router-dom";
import { Nav } from "react-bootstrap";
import JobRoute from "./jobLoad";
import "./App.css";

//The root isthe parent/landing page that loads firs, for the app, its child page is JObROute which is defined in the loader
function Root() {
  return (
    <div className="p-3 gap-3">
      <Nav variant="d-flex flex-nowrap justify-content-evenly">
        <Nav.Item>
          <Nav.Link eventKey="1" href="/job/1">
            Job One - One Location
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" href="/job/2">
            Job Two -  Multi-Location
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/job/:id",
        element: <JobRoute />,
      },
    ],
  },
]);

function App() {
  return null;
}

export default App;
