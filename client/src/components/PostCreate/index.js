import React, {useState} from 'react';
import axios from 'axios';

export default () => {
  const [title, setTitle] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title,
    });
    setTitle('');
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
