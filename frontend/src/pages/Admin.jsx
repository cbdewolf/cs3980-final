import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import { UserContext } from '../contexts/UserContext';
import Modal from '../components/Modal';
import '../styles/admin.css';

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        bio: '',
        position: '',
        school: '',
        major: '',
        is_admin: false
    });
    const { user, token } = useContext(UserContext);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user && token) {
            fetchUsers();
        }
    }, [user, token]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/users/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.status === 403) {
                setError('You do not have admin privileges');
                return;
            }
            
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const openEditModal = (user) => {
        setCurrentUser(user);
        setFormData({
            bio: user.bio || '',
            position: user.position || '',
            school: user.school || '',
            major: user.major || '',
            is_admin: user.is_admin || false
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/users/admin/users/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            
            setShowModal(false);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Please try again.');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        
        try {
            const response = await fetch(`http://localhost:8000/api/users/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        }
    };

    if (!user) {
        return (
            <>
                <NavBar />
                <div className="admin-container">
                    <h2>Admin Panel</h2>
                    <p>Please log in to access the admin panel.</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar />
                <div className="admin-container">
                    <h2>Admin Panel</h2>
                    <div className="error-message">{error}</div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="admin-container">
                <h2>Admin Panel</h2>
                <div className="admin-content">
                    <h3>User Management</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Position</th>
                                <th>School</th>
                                <th>Admin</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.position || '-'}</td>
                                    <td>{user.school || '-'}</td>
                                    <td>{user.is_admin ? 'Yes' : 'No'}</td>
                                    <td className="action-buttons">
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => openEditModal(user)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <div className="edit-user-form">
                        <h3>Edit User</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" value={currentUser?.username || ''} disabled />
                            </div>
                            <div className="form-group">
                                <label>Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Position</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>School</label>
                                <input
                                    type="text"
                                    name="school"
                                    value={formData.school}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Major</label>
                                <input
                                    type="text"
                                    name="major"
                                    value={formData.major}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="is_admin"
                                        checked={formData.is_admin}
                                        onChange={handleInputChange}
                                    />
                                    Admin User
                                </label>
                            </div>
                            <div className="form-actions">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </>
    );
}