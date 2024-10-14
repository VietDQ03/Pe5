import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const departments = await axios.get("http://localhost:9999/departments");
      setDepartments(departments.data);
      const projects = await axios.get("http://localhost:9999/projects");
      const map_data = projects.data.map((project) => {
        const findDepartments = departments.data.find(
          (department) => department.id === project.department.toString()
        );
        return {
          ...project,
          findDepartments,
        };
      });
      setProjects(map_data);
    };
    fetchData();
  }, []);
  const handleChange = (event) => {
    const departmentId = event.target.id;
    setSelectedDepartments(departmentId === "all" ? null : departmentId);
  };

  const filteredProjects = selectedDepartments
    ? projects.filter(
        (project) => project.findDepartments.id === selectedDepartments
      )
    : projects;

  return (
    <>
      <h1
        className="text-center"
        style={{ marginTop: "30px", marginBottom: "20px" }}
      >
        List of Projects
      </h1>
      <Container>
        <Row>
          <Col sm={2}>
            <Form>
              <div className="text-center">
                <h3>Departments:</h3>
              </div>
              <div className="mb-3">
                <Form.Check
                  label="All"
                  type="radio"
                  id="all"
                  name="departments"
                  onChange={handleChange}
                  checked={selectedDepartments === null}
                />
              </div>
              {departments.map((data) => (
                <div key={data.id} className="mb-3">
                  <Form.Check
                    type="radio"
                    id={data.id}
                    label={data.name}
                    name="departments"
                    onChange={handleChange}
                    checked={selectedDepartments === data.id}
                  />
                </div>
              ))}
            </Form>
          </Col>
          <Col sm={10}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Project name</th>
                  <th>Description</th>
                  <th>Start date</th>
                  <th>Type</th>
                  <th>Department</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.startDate}</td>
                    <td>{project.type}</td>
                    <td
                      onClick={() => navigate(`/departments/${project.findDepartments.id}/employees`)}
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {project.findDepartments.name}
                    </td>
                    <td
                      onClick={() => navigate(`/projects/edit/${project.id}`)}
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Projects;
