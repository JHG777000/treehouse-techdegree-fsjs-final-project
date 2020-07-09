import React from 'react';
import { Link } from 'react-router-dom';

const Form = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit();
  };

  const handleCancel = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <ShowErrors errors={props.errors} />
      <form onSubmit={handleSubmit}>
        {props.elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">
            {props.submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            <Link to="/">Cancel</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

const ShowErrors = (props) => {
 let errors = props.errors;
  if (errors !== undefined && errors.length) {
    let errors = [props.errors];
    return (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

export default Form;
