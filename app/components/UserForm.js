"use client";
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import statesAndCities from '../data/statesAndCities.json';
import { config } from '../config';
import { addUser, updateUser } from '../store/slices/userSlice';
import styles from '../page.module.css';

const UserForm = ({ userToEdit, onSave }) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(config.nameMinLength, `Name must be at least ${config.nameMinLength} characters`)
      .max(config.nameMaxLength, `Name must be less than ${config.nameMaxLength} characters`)
      .required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    linkedin: yup.string().url('Invalid URL').required('LinkedIn URL is required'),
    gender: yup.string().required('Gender is required'),
    address: yup.object().shape({
      line1: yup.string().required('Address Line 1 is required'),
      line2: yup.string(),
      state: yup.string().required('State is required'),
      city: yup.string().required('City is required'),
      pin: yup.string().required('PIN is required').matches(/^\d{5}$/, 'Invalid PIN')
    })
 
});

const { handleSubmit, control, watch, reset } = useForm({
  resolver: yupResolver(validationSchema),
  defaultValues: {
    name: '',
    email: '',
    linkedin: '',
    gender: '',
    address: {
      line1: '',
      line2: '',
      state: '',
      city: '',
      pin: ''
    }
  }
});

const state = watch('address.state');

useEffect(() => {
  if (userToEdit) {
    reset(userToEdit);
  }
}, [userToEdit, reset]);

const onSubmit = (data) => {
  if (userToEdit) {
    dispatch(updateUser({ id: userToEdit.id, updatedData: data }));
  } else {
    dispatch(addUser({ ...data, id: Date.now() }));
  }
  onSave();
};

return (
  <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    <div>
      <label>Name</label>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input {...field} />
            {fieldState.error && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>

    <div>
      <label>Email</label>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input {...field} />
            {fieldState.error && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>

    <div>
      <label>LinkedIn URL</label>
      <Controller
        name="linkedin"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input {...field} />
            {fieldState.error && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>

    <div>
      <label>Gender</label>
      <Controller
        name="gender"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <select {...field}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            {fieldState.error && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>

    <div>
      <h4>Address</h4>
      <div>
        <label>Line 1</label>
        <Controller
          name="address.line1"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input {...field} />
              {fieldState.error && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
            </>
          )}
        />
      </div>

      <div>
        <label>Line 2</label>
        <Controller name="address.line2" control={control} render={({ field }) => <input {...field} />} />
      </div>

      <div>
        <label>State</label>
        <Controller
          name="address.state"
          control={control}
          render={({ field, fieldState }) => (
            <>
                <select {...field}>
                    <option value="">Select State</option>
                    {statesAndCities.states.map((state) => (
                        <option key={state.name} value={state.name}>
                        {state.name}
                        </option>
                    ))}
                </select>
                {fieldState.error && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
            </>
          )}
        />
      </div>

      <div>
        <label>City</label>
        <Controller
          name="address.city"
          control={control}
          render={({ field, fieldState }) => (
            <>
                <select {...field}>
                    <option value="">Select City</option>
                    {state &&
                        statesAndCities.states
                        .find((s) => s.name === state)
                        ?.cities.map((city) => (
                            <option key={city} value={city}>
                            {city}
                            </option>
                        ))}
                </select>
                {fieldState.error && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
            </>
          )}
        />
      </div>

      <div>
        <label>PIN</label>
        <Controller
          name="address.pin"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input {...field} />
              {fieldState.error && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
            </>
          )}
        />
      </div>
    </div>

    <button type="submit">{userToEdit ? 'Update User' : 'Add User'}</button>
  </form>
);
};

export default UserForm;
