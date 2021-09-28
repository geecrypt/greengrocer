import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Post from './Post';

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);

  console.log('posts', posts);

  useEffect(() => {
    axios.get('/api/posts')
      .then((res) => {
        console.log('posts', res.data);
        setPosts(res.data);
      });
  }, []);

  return (
    <section>
      {posts.map((post) => <Post data={post} />)}
    </section>
  );
}