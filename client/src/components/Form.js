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

  let buttonClassName = props.buttonClassName;
  if (buttonClassName === undefined || buttonClassName === null)
    buttonClassName = 'pad-bottom';
  let errors =
    props.utility === undefined ? props.errors : props.utility().getError();
  return (
    <div>
      <ShowErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        {props.elements()}
        <div className={buttonClassName}>
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
