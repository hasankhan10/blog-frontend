import  { useState, useEffect, useContext } from 'react';
import { FiCalendar, FiUser, FiTag, FiShare2} from 'react-icons/fi';
import axios from 'axios';

import { ThemeContext } from '../App';
import Navbar from '../components/Navbar';

  
export default function HomePage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { darkMode } = useContext(ThemeContext);

    async function fetchPost() {
      const response = await axios.get("http://localhost:8080/api/v1/blogs")
      setBlogPosts(response.data.blogs)
    }
    useEffect(()=>{
      fetchPost()
    },[])
  
    const filteredPosts = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  
  
    const handleShare = (postId) => {
      const url = `Copy the url and send it to the backend. id: ${postId}`;
      console.log(url);
      
    };
  
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
       <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-3 sm:px-0">
            <div className=" sticky top-[90px] z-10 mb-5 flex">
              <input
                type="text"
                placeholder="Search blog posts..."
                className={`w-[80%] mx-auto p-3 pl-10 rounded-lg border shadow-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              {filteredPosts.map((post) => (
                <div key={post._id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden w-[70%] mx-auto`}>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{post.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FiUser className="mr-2" />
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FiCalendar className="mr-2" />
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FiTag className="mr-2" />
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.category}</span>
                    </div>
                    <div className="flex justify-around items-center">
                  
                      <button
                        onClick={() => handleShare(post.id)}
                        className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`}
                      >
                        <FiShare2 className="mr-1" />
                        <span>Share</span>
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }