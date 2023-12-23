'use client';
import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Status from '../../../../enums/status';
import Type from '../../../../enums/types';
import { toast } from 'react-toastify';

interface AnimeList {
  id: number;
  title: string;
  description: string;
  status: Status;
  genre: Type;
  dateStarted: string;
  dateCompleted: string;
  url: string;
}

interface EditContentModalProps {
  anime: AnimeList;
  onSave: (updatedContent: AnimeList) => void;
  onClose: () => void;
}

const EditContentModal: React.FC<EditContentModalProps> = ({ anime, onSave, onClose }) => {
  const [formData, setFormData] = useState<AnimeList>({
    id: anime.id,
    title: anime.title,
    description: anime.description,
    status: anime.status,
    genre: anime.genre,
    dateStarted: anime.dateStarted,
    dateCompleted: anime.dateCompleted,
    url: anime.url,
  });

  const statusOptions = Object.values(Status).map((status) => ({
    label: status,
    value: status,
  }));

  const genreOptions = Object.values(Type).map((genre) => ({
    label: genre,
    value: genre,
  }));

  const handleSave = () => {
    // Call the onSave function with the updated content
    onSave(formData);

    // Send a PUT request to update the content on the server
    fetch(`http://localhost:8080/api/v1/animelist/${anime.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 202) {
          toast.success(formData.title +' updated successfully!');
        }
      })
      .catch((error) => {
        // Handle errors (optional)
        console.error('Error updating content:', error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-80">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Content</h2>
        <div className="mb-4 border-gray-050">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            className="border rounded-md w-full py-2 px-3"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            className="border rounded-md w-full py-2 px-3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <Select
            options={statusOptions}
            value={statusOptions.find((option) => option.value === formData.status)}
            onChange={(selectedOption) =>
              setFormData({ ...formData, status: selectedOption?.value as Status })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Genre</label>
          <Select
            options={genreOptions}
            value={genreOptions.find((option) => option.value === formData.genre)}
            onChange={(selectedOption) =>
              setFormData({ ...formData, genre: selectedOption?.value as Type })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date Started</label>
          <DatePicker
            className="border rounded-md w-full py-2 px-3"
            selected={new Date(formData.dateStarted)}
            //@ts-ignore
            onChange={(date) => setFormData({ ...formData, dateStarted: date.toISOString() })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date Completed</label>
          <DatePicker
            className="border rounded-md w-full py-2 px-3"
            selected={new Date(formData.dateCompleted)}
            //@ts-ignore
            onChange={(date) => setFormData({ ...formData, dateCompleted: date.toISOString() })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">URL</label>
          <input
            type="text"
            className="border rounded-md w-full py-2 px-3"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContentModal;
