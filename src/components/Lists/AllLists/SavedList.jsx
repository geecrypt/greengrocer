import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { listType } from '../../../types';
import { useAppContext } from '../../../lib/context';
import socket from '../../../helpers/socket';

export default function SavedList(props) {
  const { list, setNewList, deleteList } = props;
  const { postsContext } = useAppContext();
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = postsContext;

  const copyHandler = () => {
    setNewList(({
      ...list,
      co2_saved: 0,
    }));
  };

  const generateMesssage = (co2) => {
    console.log('co2 in generateMessage', co2);
    switch (Math.floor((Math.random() * 100) % 5)) {
      case 0:
        // lightbulb
        return `I saved ${co2}kg of CO2. That's like having ${1} incandescent lightbulb on for ${1} hours!`;
      case 1:
        // airplane
        return `I saved ${co2}kg of CO2. That's like flying for ${1} hours!`;
      case 2:
        // car
        return `I saved ${co2}kg of CO2. That's like driving for ${1} hours`;
      case 3:
        // hours of watching netflix
        return `I saved ${co2}kg of CO2. That's like ${1} hours of watching netflix!`;
      case 4:
        // trees equivalent
        return `I saved ${co2}kg of CO2. An average tree takes ${1} hours to remove that much CO2 from the atmosphere!`;
      default:
        return 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia nam commodi aliquid ipsum, unde nemo explicabo animi molestiae voluptas, omnis tempore aliquam corporis quas optio fugit asperiores laboriosam maiores. Ab?';
    }
  };

  const shareHandler = () => {
    const post = {
      message: generateMesssage(list.co2_saved),
    };
    axios.put('/api/posts', { post })
      .then((res) => {
        const newPost = { ...res.data, likedByUser: false };
        console.log('newPost', newPost);
        setPosts((prev) => ([
          ...prev,
          newPost,
        ]));

        socket.emit('shareList', newPost);
      });
  };

  const mappedListItems = list.products.map((p) => (
    <li key={p.api_id}>
      <p>{p.title}</p>
    </li>
  ));
  return (
    <div className="saved-list">
      {/* eslint-disable-next-line */}
      <h3>List #{list.id}</h3>
      {mappedListItems}
      <div className="buttons-flexbox">
        <button className="delete-btn" type="button" onClick={() => deleteList(list.id)}>delete</button>
        <button className="copy-btn" type="button" onClick={copyHandler}>copy</button>
        <button className="share-btn" type="button" onClick={shareHandler}>share</button>
      </div>
    </div>
  );
}

SavedList.propTypes = {
  list: listType.isRequired,
  setNewList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};
