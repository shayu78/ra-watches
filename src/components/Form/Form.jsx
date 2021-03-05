import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_FORM_VALUE = {
  city: '',
  timezone: 0,  
};

export default function Form(props) {
  const { onHandleSubmit } = props;
  const [form, setForm] = useState(DEFAULT_FORM_VALUE);

  const onSubmit = (event) => {
    event.preventDefault();
    onHandleSubmit(form);
    setForm(DEFAULT_FORM_VALUE);
  }

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__input__container">
        <label className="form__label" htmlFor="city">Название города</label>
        <input className="form__input" value={form.city} name="city"
          id="city" required onChange={onInputChange} />
      </div>
      <div className="form__input__container">
        <label className="form__label" htmlFor="timezone">Временная зона</label>
        <input type="number" className="form__input" value={form.timezone} name="timezone"
          id="timezone" min="-11" max="11" required onChange={onInputChange} />
      </div>
      <button className="form__button">Добавить</button>
    </form>
  );
}

Form.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
