import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import Input from '../Input';
import { Button } from 'react-bootstrap';
import { INPUT_SCHEMA } from '../../../utils/validatingSchemas';
import validateInputData from '../helperFuncs/validateInputData';
import createNewEvents from '../helperFuncs/createNewEvents';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

import styles from './../Events.module.scss';

function EventForm (props) {
  const {
    eventArr: [events, setEvents]
  } = props;

  const [invalidInputData, setInvalidInputData] = useState(false);

  const initValues = {
    eventName: ''
  };

  const [dateValue, setDateValue] = useState(new Date());

  const addEvent = (values, formikBag) => {
    const { eventName } = values;
    const eventDate = {
      year: dateValue.getFullYear(),
      month: dateValue.getMonth(),
      day: dateValue.getDate()
    };

    console.log('dateValue.getDate( ):>> ', dateValue.getDate());
    console.log('dateValue.getMonth() :>> ', dateValue.getMonth());
    console.log('dateValue.getHours() :>> ', dateValue.getFullYear());

    const isValidData = validateInputData(events, eventName, eventDate);

    if (isValidData) {
      setInvalidInputData(isValidData);
      return;
    }
    setInvalidInputData(false);

    const newEvents = createNewEvents(events, eventName, eventDate);

    setEvents(newEvents);

    formikBag.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initValues}
        // validationSchema={INPUT_SCHEMA}
        onSubmit={addEvent}
      >
        {formikProps => {
          return (
            <Form className={styles.eventForm}>
              <fieldset className={styles.formContainer}>
                <legend>Enter an Event</legend>
                <label>
                  <Input
                    type='text'
                    name='eventName'
                    placeholder='Enter an event name...'
                  />
                </label>
                {invalidInputData ? (
                  <span className={styles.invalidData}>{invalidInputData}</span>
                ) : (
                  ''
                )}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label='Enter a date'
                    value={dateValue}
                    onChange={newValue => {
                      setDateValue(newValue);
                    }}
                    renderInput={params => (
                      <TextField
                        style={{
                          width: '300px',
                          margin: '10px 0 25px'
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
                <Button
                  className={styles.eventButton}
                  as='input'
                  type='submit'
                  variant='outline-primary'
                  value='Add event'
                />
              </fieldset>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default EventForm;
