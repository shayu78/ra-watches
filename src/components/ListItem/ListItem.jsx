import React from 'react';
import PropTypes from 'prop-types';
import Clock from '../Clock/Clock';

export default function ListItem(props) {
  const { className, item, onDeleteItem } = props;

  return (
    <li className={className}>
      <Clock item={item} onDeleteItem={() => onDeleteItem(item.id)} />
    </li>
  );
}

ListItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object.isRequired,
};
