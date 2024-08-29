"use client";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../store/slices/userSlice';
import styles from '../page.module.css';

const UserTable = ({ onEdit }) => {
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>LinkedIn URL</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.linkedin}</td>
            <td>{user.gender}</td>
            <td>
              {user.address.line1}, {user.address.line2}, {user.address.city}, {user.address.state}, {user.address.pin}
            </td>
            <td className={styles.actions}>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
