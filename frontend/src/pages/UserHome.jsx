import React, { useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import '../styles/user-home.css';
import { UserContext } from '../contexts/UserContext';
import Modal from '../components/Modal';

export default function UserHome() {
  const { user, token, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: user?.bio || '',
    position: user?.position || '',
    school: user?.school || '',
    major: user?.major || '',
    profile_pic: user?.profile_pic || '',
  });
  const [fileUpload, setFileUpload] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileUpload(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Update user profile info
      const response = await fetch('http://localhost:8000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // If there's a file to upload
      if (fileUpload) {
        const formData = new FormData();
        formData.append('file', fileUpload);

        try {
          const uploadResponse = await fetch(
            'http://localhost:8000/api/users/upload',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          if (!uploadResponse.ok) {
            throw new Error('Failed to upload file');
          }

          // File uploaded successfully
          setFileUpload(null);
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Failed to upload file. Please try again.');
        }
      }

      // Refresh user data
      const userResponse = await fetch('http://localhost:8000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
      }

      setShowModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="user-profile-container">
        {user ? (
          <div className="user-profile-card">
            {user.profile_pic && (
              <img
                src={user.profile_pic}
                alt="Profile"
                className="user-profile-pic"
              />
            )}
            <h2>{user.username}</h2>
            <div className="user-profile-details">
              <p>
                <strong>Position:</strong> {user.position || 'Not specified'}
              </p>
              <p>
                <strong>School:</strong> {user.school || 'Not specified'}
              </p>
              <p>
                <strong>Major:</strong> {user.major || 'Not specified'}
              </p>
              <p>
                <strong>Bio:</strong> {user.bio || 'No bio added yet'}
              </p>
            </div>

            <button
              className="edit-profile-btn"
              onClick={() => {
                setProfileData({
                  bio: user.bio || '',
                  position: user.position || '',
                  school: user.school || '',
                  major: user.major || '',
                  profile_pic: user.profile_pic || '',
                });
                setShowModal(true);
              }}
            >
              Edit Profile
            </button>

            <div className="documents-section">
              <h3>Your Documents</h3>
              {user.documents && user.documents.length > 0 ? (
                <ul className="documents-list">
                  {user.documents.map((doc, index) => (
                    <li key={index} className="document-item">
                      <a href={doc.url} download>
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No documents uploaded yet</p>
              )}
            </div>
          </div>
        ) : (
          <div className="user-profile-card">
            <h2>Please log in or create an account</h2>
            <p>
              <a href="/register">New? Click here to register!</a>
            </p>
            <p>
              <a href="/login">Already have an account? Login here!</a>
            </p>
          </div>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={profileData.position}
                  onChange={handleInputChange}
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>School</label>
                <input
                  type="text"
                  name="school"
                  value={profileData.school}
                  onChange={handleInputChange}
                  placeholder="Your school or university"
                />
              </div>
              <div className="form-group">
                <label>Major</label>
                <input
                  type="text"
                  name="major"
                  value={profileData.major}
                  onChange={handleInputChange}
                  placeholder="Your field of study"
                />
              </div>
              <div className="form-group">
                <label>Upload Profile Picture</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <div className="form-group">
                <label>Upload Documents</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                />
                <small>Upload resume, cover letter, or other documents</small>
              </div>
              <div className="form-actions">
                <button type="submit" disabled={uploading}>
                  {uploading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={uploading}
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
