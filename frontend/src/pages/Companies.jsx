import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';
import { UserContext } from '../contexts/UserContext';
import '../styles/companies.css';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    applications: [],
    created_by: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const { user, token } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchCompanies();
    }
  }, [user]);

  const fetchCompanies = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/companies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setCompanies(data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:8000/api/companies/${editId}`
      : 'http://localhost:8000/api/companies';
    const method = isEditing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowModal(false);
        setIsEditing(false);
        setEditId(null);
        setFormData({
          name: '',
          description: '',
          website: '',
          applications: [],
          created_by: user.username,
        });
        fetchCompanies();
      }
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this company?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/companies/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        fetchCompanies();
      }
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const handleEdit = async (company) => {
    setEditId(company._id);
    setIsEditing(true);
    setFormData({
      name: company.name,
      description: company.description,
      website: company.website,
      applications: company.applications,
      created_by: user.username,
    });
    setShowModal(true);
  };

  return (
    <>
      <NavBar />
      <div className="companies-container">
        <h2>Companies</h2>
        {user ? (
          <>
            <button
              className="add-company-btn"
              onClick={() => setShowModal(true)}
            >
              + Add New Company
            </button>

            <div className="companies-grid">
              {companies.map((company) => (
                <div className="company-card" key={company._id}>
                  <h3>{company.name}</h3>
                  <p className="card-desc">{company.description}</p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(company)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(company._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!companies.length && (
              <p className="no-companies">No companies added yet.</p>
            )}
          </>
        ) : (
          <p className="please-login">Please login to view companies</p>
        )}

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setIsEditing(false);
            setEditId(null);
          }}
        >
          <div className="company-form-container">
            <h3>{isEditing ? 'Edit Company' : 'Add New Company'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit">{isEditing ? 'Update' : 'Save'}</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setEditId(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}
