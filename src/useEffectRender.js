import axios from 'axios';
import React, { useState, useEffect } from 'react';

const useEffectRender = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchJson();
      setUser(user);
    };
    fetchUser();
  }, []);
  const fetchJson = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    return res;
  };

  return (
    <div>
      {user ? (
        <p>
          I am {user.username}: {user.email}
        </p>
      ) : null}
    </div>
  );
};

export default useEffectRender;
