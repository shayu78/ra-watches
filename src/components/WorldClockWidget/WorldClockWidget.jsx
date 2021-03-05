import React, { useState } from 'react';
import Form from '../Form/Form';
import List from '../List/List';
import ListItem from '../ListItem/ListItem';

export default function WorldClockWidget() {
  const [data, setData] = useState([]);

  const handleSubmit = (event) => !data.some((value) => value.city === event.city)
    && setData((prev) => [...prev, event]);

  const handleDeleteItem = (event) => setData((prev) => prev.filter((value) => value.id !== event));

  return (
    <React.Fragment>
      <Form onHandleSubmit={handleSubmit} />
      <List className='list__items' data={data}>
        {data =>
          data.map((item) =>
            <ListItem key={item.id} className='list__item' item={item} onDeleteItem={handleDeleteItem} />)}
      </List>
    </React.Fragment>
  );
}
