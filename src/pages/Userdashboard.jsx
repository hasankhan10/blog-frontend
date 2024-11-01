import { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { ThemeContext } from '../App';
import { useContext } from "react";
import Navbar from '../components/Navbar';
import axios from 'axios';


export default function UserDashboard({userData}) {
  const [posts, setPosts] = useState([]);
  const [postDiv, setPostDiv] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [tag,setTag] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const [userAllData,setUserAllData] = useState({})

  const { darkMode } = useContext(ThemeContext);

  const handleCreatePost = () => {
    setNewPostContent("")
    setNewPostTitle("")
    setTag("")
    setCurrentId("")
    setPostDiv(true);
  };
  async function fetchUserBlog() {
    const userBlog = await axios.get("http://localhost:8080/api/v1/users/blogs",{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    setPosts(userBlog.data.blogs)
    setUserAllData(userBlog.data)
  }
  useEffect(()=>{
    fetchUserBlog();
  },[])


  const handleEditPost = (blog) => {
    setCurrentId(blog._id)
    setPostDiv(true);
    setNewPostContent(blog.description)
    setNewPostTitle(blog.title)
    setTag(blog.keywords.join(""))
  };

  const handleDeletePost = async(blogId) => {
    
    const response = await axios.delete("http://localhost:8080/api/v1/users/delete-blog",{
      blogId:blogId
    },{
    })

    console.log(response);
    

    if(blogId === currentId){
      setPostDiv(false)
      setNewPostContent("")
    }
  };

  const handleSavePost = async() => {

    if(newPostContent==="" && newPostTitle==="" && tag===""){
      alert("Please fill in all the fields");
      return
    }
    
    const newPost = await axios.post("http://localhost:8080/api/v1/users/create-blog",{
      title:newPostTitle,
      description:newPostContent,
      keywords:tag
    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    
    setPosts(prev => [...prev,newPost.data.blog])
    setPostDiv(false);
    setNewPostContent("");
    setNewPostTitle("")
    setTag("")
  };

  const handleUpdatePost = async(currentId)=>{
    
    if(newPostContent==="" && newPostTitle==="" && tag===""){
      alert("Please fill in all the fields");
      return
    }
    
    const updateResponse = await axios.post("http://localhost:8080/api/v1/users/update-blog",{
      id:currentId,
      title:newPostTitle,
      description:newPostContent,
      keywords:tag
    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    
   
    if (currentId) {
      setPosts(posts.map(post => post._id === currentId ? { ...post, title:updateResponse.data.updatedBlog.title, description: updateResponse.data.updatedBlog.description,keywords:updateResponse.data.updatedBlog.keywords } : post));
    }
    

    setPostDiv(false);
    setNewPostContent("");
    setNewPostTitle("")
    setTag("")
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar userData = {userAllData} />
      <div className="max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row mx-3">
        <div className='tasks flex-1 md:w-1/3 flex flex-col gap-2'>
          <h1 className=' w-full font-serif font-bold text-2xl my-3'>My Blog Posts</h1>
          {
            posts && posts.map((blog,index) => {
              return (
                <div key={index} className=' w-[80%] h-14 rounded-lg bg-white flex border border-black'>
                  <p className={` w-[80%] h-full flex items-center px-3 font-medium ${darkMode && ' text-gray-900'}`}>{blog.title.substring(0, 20) + '...'}</p>
                  <section className=' w-[20%] h-full flex justify-center items-center gap-2'>
                    <FiEdit onClick={() => handleEditPost(blog)} className=' text-blue-700 cursor-pointer' />
                    <FiTrash2 onClick={() => handleDeletePost(blog._id)} className=' text-red-600 cursor-pointer' />
                  </section>
                </div>
              )
            })
          }
        </div>
        <div className='create flex-1 flex flex-col gap-2 mt-2'>
          <div className=' w-full h-10 flex justify-end'>
            <button onClick={handleCreatePost} className=' w-40 rounded-md h-full bg-blue-600 text-white text-lg font-bold flex justify-center items-center gap-3'>
              <FiPlus />
              New Post
            </button>
          </div>
          {
            postDiv && (
              <div className='post w-full h-fit rounded-md mt-5 flex flex-col md:flex-row gap-6 justify-center items-center'>
                <div className='custom w-full md:w-52 h-80 bg-gray-300 rounded-lg flex flex-col gap-2'>
                    {/* here will be the editor of the text */}
                </div>
                <div className='text-editor w-full md:w-96 h-full bg-gray-300 rounded-lg overflow-hidden flex flex-col justify-center items-center'>
                  <input className={`${darkMode && 'text-gray-900'} px-5 mt-3 rounded-md h-10 w-[95%]`} onChange={(e)=>setNewPostTitle(e.target.value)} type="text" placeholder='Enter the title' value={newPostTitle} />
                  <textarea placeholder='Description...' value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} name="" id="" rows="8" className={`${darkMode && 'text-gray-900'} px-5 py-2 mt-2 rounded-md w-[95%]`}></textarea>
                  <input type="text" placeholder='Enter tag ex-React' required value={tag} onChange={(e)=>setTag(e.target.value)} className={`${darkMode && 'text-gray-900'} px-2 mt-3 rounded-md h-8`} />
                  {
                    currentId ? <button onClick={() => handleUpdatePost(currentId)} className=' w-36 h-10 bg-blue-800 mt-3 font-semibold text-white text-xl rounded-md mb-2' type='submit'>Update</button> : <button onClick={handleSavePost} className=' w-36 h-10 bg-blue-800 mt-3 font-semibold text-white text-xl rounded-md mb-2' type='submit'>Save</button>
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}