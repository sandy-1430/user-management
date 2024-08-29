"use client";
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import store from './store';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleAddClick = () => {
    setUserToEdit(null);
    setShowForm(true);
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
  };

  return (
    <Provider store={store}>
      <div>
        <h1>User Management</h1>
        {showForm && <UserForm userToEdit={userToEdit} onSave={handleSave} />}
        <button onClick={handleAddClick}>Add User</button>
        <UserTable onEdit={handleEditClick} />
      </div>
    </Provider>
  );
}
