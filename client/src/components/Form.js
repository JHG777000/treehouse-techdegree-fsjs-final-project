import React from 'react';

const Form = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.cancel();
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
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const ShowErrors = (errors) => {
  if (errors.length) {
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
};

export default Form;
