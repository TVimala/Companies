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
    foundedYear: "",
    revenue: "",
    website: "",
    tags: "",
    description: ""
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit for Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      if (editId) {
        // Update existing company
        await axios.put(`http://localhost:5000/api/companies/${editId}`, dataToSend);
        setCompanies(companies.map(c => (c._id === editId ? { ...c, ...dataToSend } : c)));
        setEditId(null);
      } else {
        // Add new company
        const res = await axios.post("http://localhost:5000/api/companies", dataToSend);
        setCompanies([...companies, res.data]);
      }

      // Reset form
      setFormData({
        name: "", industry: "", employees: "", location: "",
        foundedYear: "", revenue: "", website: "", tags: "", description: ""
      });
    } catch (err) {
      console.error("Error submitting company:", err);
    }
  };

  // Delete company
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
      foundedYear: company.foundedYear || "",
      revenue: company.revenue || "",
      website: company.website || "",
      tags: company.tags ? company.tags.join(", ") : "",
      description: company.description || ""
    });
    setEditId(company._id);
  };

  // Filter companies by search
  const filteredCompanies = companies.filter(
    c => c.name?.toLowerCase().includes(search.toLowerCase()) ||
         c.industry?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Company Manager</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or industry..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Company Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} />
        <input type="number" name="employees" placeholder="Employees" value={formData.employees} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="number" name="foundedYear" placeholder="Founded Year" value={formData.foundedYear} onChange={handleChange} />
        <input type="number" name="revenue" placeholder="Revenue" value={formData.revenue} onChange={handleChange} />
        <input type="url" name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} />
        <input type="text" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <button type="submit">{editId ? "Update Company" : "Add Company"}</button>
      </form>

      {/* Companies Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Employees</th>
            <th>Location</th>
            <th>Founded Year</th>
            <th>Revenue</th>
            <th>Website</th>
            <th>Tags</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length > 0 ? filteredCompanies.map(company => (
            <tr key={company._id}>
              <td>{company.name}</td>
              <td>{company.industry || "—"}</td>
              <td>{company.employees || "—"}</td>
              <td>{company.location || "—"}</td>
              <td>{company.foundedYear || "—"}</td>
              <td>{company.revenue || "—"}</td>
              <td>
                {company.website ? <a href={company.website} target="_blank" rel="noreferrer">Link</a> : "—"}
              </td>
              <td>{company.tags?.join(", ") || "—"}</td>
              <td>{company.description || "—"}</td>
              <td>
                <button onClick={() => handleEdit(company)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(company._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>No companies found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
