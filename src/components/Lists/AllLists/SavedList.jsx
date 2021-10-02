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
    switch (Math.floor((Math.random() * 100) % 5)) {
      case 0:
        // lightbulb
        return '';
      case 1:
        // airplane
        return '';
      case 2:
        // car
        return '';
      case 3:
        // KB of network traffic
        return '';
      case 4:
        // trees equivalent
        return '';
      default:
        return '';
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
    <ul>
      <h1>{list.id}</h1>
      {mappedListItems}
      <button type="button" onClick={() => deleteList(list.id)}>Delete</button>
      <button type="button" onClick={copyHandler}>Copy</button>
      <button type="button" onClick={shareHandler}>Share</button>
    </ul>
  );
}

SavedList.propTypes = {
  list: listType.isRequired,
  setNewList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};
