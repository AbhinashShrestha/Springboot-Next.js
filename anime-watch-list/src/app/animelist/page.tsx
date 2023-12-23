'use client';
import React, { useState, useEffect } from 'react';
import Status from '../../../enums/status';
import Type from '../../../enums/types';
import EditContentModal from '../components/Modal/EditContentModal';
import {BsTrash} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimeForm from '../components/Modal/AddContentModal';
import Navbar from '../components/Navbar/navbar';

interface Animelist {
  id: number;
  title: string;
  description: string;
  status: Status;
  genre: Type;
  dateStarted: string;
  dateCompleted: string;
  url: string;
}


const ContentTable: React.FC = () => {
  const [isAnimeFormOpen, setIsAnimeFormOpen] = useState(false);
  const [animeList, setAnimeList] = useState<Animelist[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState<Animelist | null>(null);


  // Function to fetch new data
  const fetchNewData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/animelist');
      if (response.ok) {
        const data = await response.json();
        setAnimeList(data);
      }
    } catch (error) {
      console.error('Error fetching new data:', error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/animelist')
      .then((response) => response.json())
      .then((data) => {
        setAnimeList(data);
      });
  }, []);


  const handleDelete = (id: number,title: string) => {
    // Send a DELETE request to the API to delete the content with the given id
    fetch(`http://localhost:8080/api/animelist/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          // Update the contentList after successful deletion
          setAnimeList(animeList.filter((anime) => anime.id !== id));
          toast( title + "Delete Successful")
        }
      })
      .catch((error) => {
        console.error('Error deleting content:', error);
      });
  };

  const handleEdit = (content: Animelist) => {
    // Set the editingContent state when the "Edit" button is clicked
    setEditingContent(content);
    setIsEditing(true);
    // toast.success('Edit Successful');
  };



  return (
    <div className="w-full mx-auto max-w-7xl">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-semibold">Anime List</h1>
          <button
            onClick={() => setIsAnimeFormOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add new Anime 
          </button>
      </div>

      <div className="overflow-x-auto shadow-2xl w-full">
        <table className="w-full table-auto border-2 border-gray-900">
          <thead className=' border-2 border-gray-900'>
            <tr className='border-2 border-gray-900'>
              <th className="px-4 py-2 border-2 border-gray-900">ID</th>
              <th className="px-4 py-2 border-2 border-gray-900">Title</th>
              <th className="px-4 py-2 border-2 border-gray-900">Description</th>
              <th className="px-4 py-2 border-2 border-gray-900">Status</th>
              <th className="px-4 py-2 border-2 border-gray-900">Genre</th>
              <th className="px-4 py-2 border-2 border-gray-900">Date Started</th>
              <th className="px-4 py-2 border-2 border-gray-900">Date Completed</th>
              <th className="px-4 py-2 border-2 border-gray-900">URL</th>
              <th className="px-4 py-2 border-2 border-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className='border-2 border-gray-900'>
            {animeList.map((anime,index) => (
              <tr className='border-2 border-gray-900' key={anime.id}>
                <td className="px-auto py-auto border-2 border-gray-900">{index + 1}</td>
                <td className="px-atuo py-auto border-2 border-gray-900">{anime.title}</td>
                <td className="px-atuo py-auto border-2 border-gray-900">{anime.description}</td>
                <td className="px-atuo py-auto border-2 border-gray-900">{anime.status}</td>
                <td className="px-atuo py-auto border-2 border-gray-900">{anime.genre}</td>
                <td className="px-atuo py-auto border-2 border-gray-900">{anime.dateStarted}</td>
                <td className="px-atuo py-auto border-2 border-gray-900">{anime.dateCompleted}</td>
                <td className="px-atuo py-auto border-2 border-gray-900">
                  <a href={anime.url} className="text-blue-500 hover:underline">
                    {anime.url}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-black hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(anime)}
                    
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(anime.id,anime.title)}
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  

      {isEditing && editingContent && (
        <EditContentModal
          anime={editingContent}
          onSave={(updatedAnime) => {
            // Handle the save action here, e.g., send a PUT request
            console.log('Saving updated content:', updatedAnime);

             // Update the contentList to reflect the changes
            setAnimeList((prevAnimeList) => prevAnimeList.map((anime) => {
              if (anime.id === updatedAnime.id) {
                return updatedAnime;
              }
              return anime;
            }));

            // Close the modal and reset the editing state
            setIsEditing(false);
          }}


          onClose={() => {
            // Close the modal without saving
            setEditingContent(null);
            setIsEditing(false);
          }}
        />
      )}

      {/* Conditionally render the AnimeForm modal */}
      {isAnimeFormOpen && (
        <AnimeForm
          onClose={() => setIsAnimeFormOpen(false)} isOpen={isAnimeFormOpen}    
           // Pass the isSuccess prop
          isSuccess={true}
          // Pass the fetchNewData callback function
          onSuccessfulSubmit={fetchNewData}
          
        />
      )}


    </div>
  );
};

export default function AnimeListMain(){
  return(
    <div>
      <Navbar />
      <div className='p-5 w-full'>
      <ContentTable />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </div>
  );
}

