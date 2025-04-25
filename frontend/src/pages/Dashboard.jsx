import React, { useState, useEffect, useContext } from "react";
import "../styles/dashboard.css";
import NavBar from "../components/NavBar";
import StatusCard from "../components/StatusCard";
import AddNewApplication from "../components/AddNewApplication";
import Modal from "../components/Modal";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationTable from "../components/ApplicationTable";
import EditApplication from "../components/EditApplication";
import { UserContext } from "../contexts/UserContext";

const Dashboard = () => {
  // in the future, this will be fetched from backend using useEffect
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useContext(UserContext);

  const fetchApplications = async () => {
    console.log("Window origin:", window.location.origin);
    try {
      const res = await fetch("http://localhost:8000/api/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data)) {
        console.warn("Bad payments response:", data);
        setPayments([]);
        return;
      }
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchApplications();
    } else {
      setApplications([]);
      setLoading([]);
    }
  }, [user]);

  // Handle adding a new application
  const handleAddApplication = async (application) => {
    try {
      const response = await fetch("http://localhost:8000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(application),
      });

      if (!response.ok) throw new Error("failed to add app");
      const createdApp = await response.json();
      setApplications((prev) => [...prev, createdApp]);
      setShowModal(false);
    } catch (error) {
      console.error("add app failed, ", error);
    }
  };

  // Handle editing an application
  const handleEditClick = (app) => {
    setCurrentApp(app);
    setModalContent("edit");
    setShowModal(true);
  };

  // Handle deleting an application
  const handleDeleteClick = (app) => {
    setCurrentApp(app);
    setModalContent("delete");
    setShowModal(true);
  };

  // Handle form submission for editing
  const handleEditSubmit = async (updatedApp) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/applications/${currentApp._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedApp),
          Authorization: `Bearer ${token}`,
        }
      );
      if (!res.ok) throw new Error("failed to update app");
      //const updatedAppData = await res.json();
      await fetchApplications();
      setCurrentApp(null);
      setShowModal(false);
    } catch (error) {
      console.error("update app failed, ", error);
    }
  };

  // Handle confirmation for deleting
  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/applications/${currentApp._id}`,
        {
          method: "DELETE",
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.ok) throw new Error("failed to delete app");
      fetchApplications();
      setShowModal(false);
      setCurrentApp(null);
    } catch (error) {
      console.error("delete app failed, ", error);
    }
  };

  // Render modal content based on current action
  const renderModalContent = () => {
    switch (modalContent) {
      case "add":
        return (
          <ApplicationForm
            onCancel={() => setShowModal(false)}
            onSubmit={handleAddApplication}
            initialValues={{}}
          />
        );
      case "edit":
        return (
          <ApplicationForm
            onCancel={() => setShowModal(false)}
            onSubmit={handleEditSubmit}
            initialValues={currentApp}
          />
        );
      case "delete":
        return (
          <div className="delete-confirmation">
            <h3>Delete Application</h3>
            <p>Are you sure you want to delete this application?</p>
            <div className="application-summary">
              <p>
                <strong>Company:</strong> {currentApp?.company}
              </p>
              <p>
                <strong>Position:</strong> {currentApp?.position}
              </p>
              <p>
                <strong>Status:</strong> {currentApp?.status}
              </p>
            </div>
            <div className="delete-actions">
              <button className="delete-btn" onClick={handleDeleteConfirm}>
                Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h2 className="dashboard-heading">Your Applications</h2>
        <div className="status-cards">
          {/* these values will also be fetched from backend and filtered based on the status of the applications*/}
          <StatusCard label="Total" count={applications.length} />
          <StatusCard
            label="Applied"
            count={
              applications.filter((app) => app.status === "Applied").length
            }
          />
          <StatusCard
            label="Interview"
            count={
              applications.filter((app) => app.status === "Interview").length
            }
          />
          <StatusCard
            label="Offered"
            count={
              applications.filter((app) => app.status === "Offered").length
            }
          />
          <StatusCard
            label="Rejected"
            count={
              applications.filter((app) => app.status === "Rejected").length
            }
          />
        </div>
      </div>
      {user ? (
        <div className="dashboard-actions">
          <AddNewApplication
            onClick={() => {
              setModalContent("add");
              setShowModal(true);
            }}
          />
        </div>
      ) : (
        <p className="please-login"> Please Login to view Applications</p>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {renderModalContent()}
      </Modal>
      {user ? (
        <div className="applications-container">
          <ApplicationTable
            applications={applications}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
