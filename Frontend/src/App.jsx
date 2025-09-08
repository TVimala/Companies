import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    employees: "",
    location: "",
    revenue: "",
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/companies");
      setCompanies(res.data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      employees: Number(formData.employees),
      revenue: Number(formData.revenue),
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/companies/${editId}`, dataToSend);
        setCompanies(companies.map(c => (c._id === editId ? { ...c, ...dataToSend } : c)));
        setEditId(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/companies", dataToSend);
        setCompanies([...companies, res.data]);
      }
      setFormData({ name: "", industry: "", employees: "", location: "", revenue: "" });
    } catch (err) {
      console.error("Error submitting company:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/companies/${id}`);
      setCompanies(companies.filter(c => c._id !== id));
    } catch (err) {
      console.error("Error deleting company:", err);
    }
  };

  const handleEdit = (company) => {
    setFormData({
      name: company.name || "",
      industry: company.industry || "",
      employees: company.employees || "",
      location: company.location || "",
      revenue: company.revenue || "",
    });
    setEditId(company._id);
  };

  const filteredCompanies = companies.filter(
    c => c.name?.toLowerCase().includes(search.toLowerCase()) ||
         c.industry?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Company Data</h1>

      <input
        type="text"
        placeholder="Search by name or industry..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} />
        <input type="number" name="employees" placeholder="Employees" value={formData.employees} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="number" name="revenue" placeholder="Revenue" value={formData.revenue} onChange={handleChange} />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Employees</th>
            <th>Location</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length > 0 ? filteredCompanies.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.industry}</td>
              <td>{c.employees}</td>
              <td>{c.location}</td>
              <td>{c.revenue}</td>
              <td>
                <button className="update-btn" onClick={() => handleEdit(c)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No companies found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
