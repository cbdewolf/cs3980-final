import React, { useState, useEffect } from 'react'
import '../styles/dashboard.css'
import NavBar from '../components/NavBar'
import StatusCard from '../components/StatusCard'
import AddNewApplication from '../components/AddNewApplication'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'
import ApplicationTable from '../components/ApplicationTable'

const Dashboard = () => {
  // in the future, this will be fetched from backend using useEffect
  const [applications, setApplications] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentApp, setCurrentApp] = useState(null)
  const [modalContent, setModalContent] = useState('add') // 'add', 'edit', or 'delete'

  // Handle adding a new application
  const handleAddApplication = (application) => {
    setApplications([...applications, application])
    setShowModal(false)
  }

  // Handle editing an application
  const handleEditClick = (app) => {
    setCurrentApp(app)
    setModalContent('edit')
    setShowModal(true)
  }

  // Handle deleting an application
  const handleDeleteClick = (app) => {
    setCurrentApp(app)
    setModalContent('delete')
    setShowModal(true)
  }

  // Handle form submission for editing
  const handleEditSubmit = (updatedApp) => {
    const updatedApps = applications.map(app => 
      app.id === updatedApp.id ? updatedApp : app
    )
    setApplications(updatedApps)
    setShowModal(false)
  }

  // Handle confirmation for deleting
  const handleDeleteConfirm = () => {
    const updatedApps = applications.filter(app => app.id !== currentApp.id)
    setApplications(updatedApps)
    setShowModal(false)
  }

  // Render modal content based on current action
  const renderModalContent = () => {
    switch (modalContent) {
      case 'add':
        return (
          <ApplicationForm 
            onCancel={() => setShowModal(false)}
            onSubmit={handleAddApplication}
          />
        )
      case 'edit':
        return (
          <ApplicationForm 
            onCancel={() => setShowModal(false)}
            onSubmit={handleEditSubmit}
            initialValues={currentApp}
          />
        )
      case 'delete':
        return (
          <div className="delete-confirmation">
            <h3>Delete Application</h3>
            <p>Are you sure you want to delete this application?</p>
            <div className="application-summary">
              <p><strong>Company:</strong> {currentApp?.company}</p>
              <p><strong>Position:</strong> {currentApp?.position}</p>
              <p><strong>Status:</strong> {currentApp?.status}</p>
            </div>
            <div className="delete-actions">
              <button className="delete-btn" onClick={handleDeleteConfirm}>
                Delete
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <NavBar username="test" />
      <div className="dashboard-container">
        <h2 className="dashboard-heading">Your Applications</h2>
        <div className="status-cards">
          {/* these values will also be fetched from backend and filtered based on the status of the applications*/}
          <StatusCard label="Total" count={applications.length} />
          <StatusCard label="Applied" count={applications.filter(app => app.status === 'Applied').length} />
          <StatusCard label="Interview" count={applications.filter(app => app.status === 'Interview').length} />
          <StatusCard label="Offered" count={applications.filter(app => app.status === 'Offered').length} />
          <StatusCard label="Rejected" count={applications.filter(app => app.status === 'Rejected').length} />
        </div>
      </div>
      <div className="dashboard-actions">
        <AddNewApplication onClick={() => {
          setModalContent('add')
          setShowModal(true)
        }} />
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {renderModalContent()}
      </Modal>
      <div className="applications-container">
        <ApplicationTable 
          applications={applications} 
          onEditClick={handleEditClick} 
          onDeleteClick={handleDeleteClick}
        />
      </div>
    </>
  )
}

export default Dashboard