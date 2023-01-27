import "./App.css";
import { auth, db } from "./Firebase/init";
import React from "react";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc  } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { async } from "@firebase/util";
//onAuthStateChanged allows users to stay logged In when page is reloaded

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  //updating post
  async function updatePost() {
     const hardcodeId = "7S9Vb0TOadjmTVleTVLt";
     const postRef = doc(db, "posts", hardcodeId);
     const post = await getPostById(hardcodeId);
     console.log(post);
     const newPost = {
      description: "Finish Your Training",
      uid: "1",
      title: "Land a $300k job"
     };
     updateDoc(postRef, newPost)
  }

  function deletePost (){
    const hardcodeId = "7S9Vb0TOadjmTVleTVLt";
    const postRef = doc(db, "posts", hardcodeId);
    deleteDoc(postRef)
  }

  
  function createPost(){
    const post = {
      title: "Finish internship Training ",
      description: "Do your training",
      uid: user.uid, // show post by one user
    };

    addDoc(collection(db, "post"), post);
  }

  async function getAllPost(){
    const { docs } = await getDocs(collection(db, "post"))
    const posts = docs.map(elem => ({...elem.data(), id: elem.id})); //shows an id field in console
    console.log(posts)
  }

    /* only variable we need is docs, line 27 converts to readable data */
  

  async function getPostById(id){
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
   return postSnap.data();
   
  } //getting a single post

  async function getPostByUid(){
    const postCollectionRef = await query(
      collection(db, 'posts'),
      where('uid', "==", '1' ) //using user.uid fetchesall uids, can use "some uid" to grab specific uid
    );
      const { docs } = await getDocs(postCollectionRef);
      console.log(docs.map(doc => doc.data()))
  }


  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);
  //run something when the page first mounts you need to pass an empty array in use effect

  function register() {
    console.log("Register");
    createUserWithEmailAndPassword(auth, "email@email.com", "password")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "password")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Log In</button>
      <button onClick={logout}>Log Out</button>
      {loading ? "loading...." : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPost}>Get All Post</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
      {/* only variable we need is docs */}
    </div>
  );
}

export default App;
