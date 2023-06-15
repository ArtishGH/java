import React, { useRef, useState, useEffect } from 'react';
import './UserDashboard.scss';
import axios from 'axios';

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const titleRef = useRef();
  const contentRef = useRef();
  const receiverRef = useRef();

  useEffect(() => {
    getUsers();
    fetchPosts();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('/api/user', {
        headers: {
          Authentication: localStorage.getItem('token'),
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('/api/posts', { token });
      if (response.data.success) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const sendEmailHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const receiver = receiverRef.current.value;

    sendEmail({ title, content, receiver });
  };

  const sendEmail = async (data) => {
    try {
      data.sender = localStorage.getItem('email');
      await axios.post('/api/messages', data, {
        headers: {
          Authentication: localStorage.getItem('token'),
        },
      });
      document.getElementById('email').innerHTML = 'Message sent!';
      getUsers();
      fetchPosts();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const deleteMessage = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: {
          Authentication: localStorage.getItem('token'),
        },
        data: { postId },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <>
      <div className="UserDashboard-container">
        <h1>Send message</h1>
        <form>
          <div className="UserDashboard-inputs">
            <input type="text" ref={titleRef} placeholder="Title" />
            <textarea type="text" ref={contentRef} placeholder="Content" />
            <select ref={receiverRef}>
              {users.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>
          <button className="o" onClick={sendEmailHandler}>
            Send
          </button>
          <div id="email"></div>
        </form>
      </div>

      {posts.map((post) => (
        <div className="message" key={post._id}>
          <h2>New message:</h2>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => deleteMessage(post._id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default UserDashboard;
