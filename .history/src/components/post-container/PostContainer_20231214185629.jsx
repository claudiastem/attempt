import { useEffect, useState } from 'react';
import Axios from 'axios';

import Post from '../post/Post';

export default function PostContainer() {

  // const postsArr = [
  //   {
  //     userId: 1,
  //     id: 1,
  //     title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
  //     body: 'Quas incidunt iure, porro, blanditiis esse voluptates voluptate sapiente ut animi eos repudiandae suscipit enim labore reprehenderit ullam quos delectus. Dignissimos, provident?',
  //   },
  //   {
  //     userId: 2,
  //     id: 2,
  //     title: 'Ajeje Barzov',
  //     body: 'wewe',
  //   },
  // ];

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   Axios.get(POSTS_URL)
  //     .then((response) => {
  //       console.log(posts);
  //       setPosts(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const httpGetRequest = (endPoint, setArrayCallback) => {
    
  let url = `https://jsonplaceholder.typicode.com/${endPoint}`;  
    
    Axios.get(url)
      .then((response) => {
        console.log('response status => ' + response.status);
        setArrayCallback(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            'Errore HTTP:',
            error.response.status,
            error.response.data
          );

          if (error.response.status === 404) {
            console.log('ERRORE 404 - Pagina non trovata');
            //setErrore(true);
          }
        } else if (error.request) {
          console.error(
            'Nessuna risposta ricevuta dalla richiesta:',
            error.request
          );
        } else {
          console.error(
            'Errore durante la configurazione della richiesta:',
            error.message
          );
        }
      });
  }

  useEffect(() => {
    httpGetRequest("posts", setPosts);
    httpGetRequest("users", setUsers);
  }, []);

  return (
    <ul>
      {posts.map((post, index) => (
        <div key={index}>
          <Post post={post} />
        </div>
      ))}

      {/* {console.log(posts)} */}
      {/* {postsArr.map((post, index) => (
        <Post key={index} post={post} />
      ))} */}
    </ul>
  );
}
