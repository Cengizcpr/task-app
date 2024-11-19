'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  const { task_id } = router.query;

  useEffect(() => {
    const token = Cookie.get('token');
 
    setToken(token);

    if (task_id) {
      async function fetchTask() {
        try {
          const response = await axios.get(
            `http://localhost:5000/tasks/${task_id}`
          );
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          const formattedDueDate = task.due_date
            ? task.due_date.slice(0, 16)
            : '';
          setDueDate(formattedDueDate);
          setStatus(task.status);
          console.log(task);
        } catch (err) {
          setError('Failed to fetch task');
        }
      }
      fetchTask();
    }
  }, [task_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (task_id) {
        await axios.patch(
          `http://localhost:5000/tasks`,
          {
            title,
            description,
            due_date: dueDate,
            status,
            task_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        router.push('/');
      } else {
        await axios.post(
          'http://localhost:5000/tasks',
          {
            title,
            description,
            due_date: dueDate,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        router.push('/');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {task_id ? 'Update Task' : 'Add New Task'}
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">pending</option>
            <option value="in_progress">in_progress</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Saving...' : task_id ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}
