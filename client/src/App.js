import React from 'react';

import PostCreate from './components/PostCreate';
import PostList from './components/PostList';

export default () => {
  return (
    <div className="container">
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
};
