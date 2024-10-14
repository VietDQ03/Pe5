import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Employees = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [employees, SetEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const departmentAPI = await axios.get(
          `http://localhost:9999/departments/${id}`
        );
        const employeesAPI = await axios.get("http://localhost:9999/employees");
        setDepartments(departmentAPI.data)
        // Find the supplier related to the product
      
        const departmentData = departmentAPI.data;

        // Lọc danh sách nhân viên thuộc về phòng ban đã chọn
        const filteredEmployees = employeesAPI.data.filter(
          (employee) => employee.department.toString() === departmentData.id
        );

          SetEmployees(filteredEmployees);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  console.log("viet", employees);
  
  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  return (
    <>
      <h1 className="text-center" style={{ margin: "20px" }}>
        List of Employees
      </h1>
      <Container>
        <Link to="/">Home page</Link>
        <h2>Department: {departments.name}</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Employees name</th>
              <th>Date of birth</th>
              <th>Gender</th>
              <th>Position </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.dob}</td>
                <td>{employee.gender}</td>
                <td>{employee.position}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default Employees;
