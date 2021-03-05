import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default function List(props) {
  const { className, data } = props;

  const id_data = data.map((value) => {
    value.id = nanoid();
    return value;
  });

  return (
    <ul className={className}>
      {props.children(id_data)}
    </ul>
  );
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};
