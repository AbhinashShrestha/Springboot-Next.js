import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import Status from '../../../../enums/status';
import Type from '../../../../enums/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface AnimeData {
  // id: number;
  title: string;
  description: string;
  status: Status;
  genre: Type;
  dateStarted: string;
  dateCompleted: string;
  url: string;
}

interface AnimeFormProps {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean;
  onSuccessfulSubmit: () => void;
}


const AnimeForm: React.FC<AnimeFormProps> = ({ isOpen, onClose,isSuccess,onSuccessfulSubmit}) => {
  const router = useRouter();

  const notify = () => toast('Data submitted successfully!', {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const initialFormData: AnimeData = {
    // id: 0,
    title: '',
    description: '',
    status: Status.PLAN_TO_WATCH,
    genre: Type.SHOUNEN,
    dateStarted: '',
    dateCompleted: '',
    url: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const statusOptions = Object.values(Status).map((status) => ({
    value: status,
    label: status,
  }));

  const genreOptions = Object.values(Type).map((genre) => ({
    value: genre,
    label: genre,
  }));

  const handleChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/animelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data submitted successfully!');
        notify();
          // Trigger a new data fetch in ContentTable

        // Close the modal after successful submission
        onClose();
        // Call the onSuccessfulSubmit function when submission is successful
        onSuccessfulSubmit();
      } else {
        console.error('Error submitting data:', response.statusText);
        toast.error('Error submitting data!');
        router.push('/animelist');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) {
    // If the modal is not open, return null to prevent rendering
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-80">
      <div className="bg-white p-8 rounded-lg shadow-md w-5/12 "> {/* Adjust the max width here */}
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl border-gray-800 border-2 rounded px-8 pt-6 pb-8 mb-4">
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
              ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={(e) => handleChange('id', parseInt(e.target.value, 10))}
              required
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <Select
              id="status"
              options={statusOptions}
              value={statusOptions.find((option) => option.value === formData.status)}
              onChange={(selectedOption) => handleChange('status', selectedOption?.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Genre
            </label>
            <Select
              id="genre"
              options={genreOptions}
              value={genreOptions.find((option) => option.value === formData.genre)}
              onChange={(selectedOption) => handleChange('genre', selectedOption?.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date Started
            </label>
            <DatePicker
              selected={formData.dateStarted ? new Date(formData.dateStarted) : null}
              onChange={(date) => handleChange('dateStarted', date)}
              dateFormat="yyyy-MM-dd"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date Completed
            </label>
            <DatePicker
              selected={formData.dateCompleted ? new Date(formData.dateCompleted) : null}
              onChange={(date) => handleChange('dateCompleted', date)}
              dateFormat="yyyy-MM-dd"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
              URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                // Close the modal and reset the form
                onClose();
                setFormData(initialFormData);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimeForm;
