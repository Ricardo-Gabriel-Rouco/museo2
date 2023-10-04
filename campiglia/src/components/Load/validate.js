export const validate = (values) => {
    const errors = {};

    if (!values.year) {
      errors.year = 'Required';
    } else if (isNaN(values.year)) {
      errors.year = 'Must be a number';
    }

    if (!values.crime) {
      errors.crime = 'Required';
    }

    if (!values.fileNumber) {
      errors.fileNumber = 'Required';
    } else if (isNaN(values.fileNumber)) {
      errors.fileNumber = 'Must be a number';
    }

    if (!values.title) {
      errors.title = 'Required';
    }

    if (!values.boxNumber) {
      errors.boxNumber = 'Required';
    } else if (isNaN(values.boxNumber)) {
      errors.boxNumber = 'Must be a number';
    }

    return errors;
  };