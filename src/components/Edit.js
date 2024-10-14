import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    type: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectAPI = await axios.get(
          `http://localhost:9999/projects/${id}`
        );
        setProject(projectAPI.data); // Gán dữ liệu nhận về vào state `project`

        const departmentsAPI = await axios.get(
          "http://localhost:9999/departments"
        );
        setDepartments(departmentsAPI.data); // Lấy danh sách departments
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDataToServer(project);
      alert("Update success.");
      navigate(`/`);
    } catch (error) {
      console.error("Error adding stars:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };
  const addDataToServer = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:9999/projects/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error adding data:", error);
      throw error;
    }
  };
  if (loading) {
    return <p>Loading movie...</p>;
  }

  return (
    <>
      <h1 className="text-center" style={{ margin: "20px" }}>
        Edit Project
      </h1>

      <Container>
        <Link style={{ margin: "20px" }} to="/">
          Home page
        </Link>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Project name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={project.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={project.type}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Label>Department</Form.Label>
          <Form.Select
            name="department"
            value={project.department}
            onChange={handleChange}
          >
            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </Form.Select>
          <Button style={{ marginTop: "20px" }} variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Edit;
