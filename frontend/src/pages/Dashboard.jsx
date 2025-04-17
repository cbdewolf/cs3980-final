import React, { useState } from 'react'
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

  // in the future, this will send a POST request to the backend
  const handleAddApplication = (application) => {
    setApplications([...applications, application])
    setShowModal(false)
  }

  return (
    <>
      <NavBar username="test" />
      <div className="dashboard-container">
        <h2 className="dashboard-heading">Your Applications</h2>
        <div className="status-cards">
          {/* these values will also be fetched from backend and filtered based on the status of the applications*/}
          <StatusCard label="Total" count={0} />
          <StatusCard label="Applied" count={0} />
          <StatusCard label="Interview" count={0} />
          <StatusCard label="Offered" count={0} />
          <StatusCard label="Rejected" count={0} />
        </div>
      </div>
      <div className="dashboard-actions">
        <AddNewApplication onClick={() => setShowModal(true)} />
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ApplicationForm 
          onCancel={() => setShowModal(false)}
          onSubmit={handleAddApplication}
        />
      </Modal>
      <div className="applications-container">
        <ApplicationTable applications={applications}/>
      </div>
    </>
  )
}
export default Dashboard
