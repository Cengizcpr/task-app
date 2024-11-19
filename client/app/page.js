'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlusSquare } from 'react-icons/fa';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = Cookie.get('token');
    setToken(token);
    async function fetchTasks() {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task.task_id !== taskId));
      }
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };
  const handleRedirect = async (e) => {
    e.preventDefault();
    Cookie.remove('token');
    router.push('/login');
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Task List</h2>
      <Link className="btn btn-success mb-4" href="/form">
        <FaPlusSquare /> Task Add
      </Link>

      <button
        className="btn btn-warning mb-4 mx-2"
        onClick={(e) => handleRedirect(e)}
      >
        <CiLogout /> Logout
      </button>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No task found.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.task_id}>
                  <td>{task.task_id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{formatDate(task.due_date)}</td>
                  <td
                    className={
                      task.status == 'pending'
                        ? 'bg-warning text-white'
                        : task.status == 'in_progress'
                        ? 'bg-info text-white'
                        : 'bg-success text-white'
                    }
                  >
                    {task.status}
                  </td>
                  <td>
                    <Link
                      className="btn btn-info"
                      href={`/form?task_id=${task.task_id}`}
                    >
                      <FaEdit />
                    </Link>{' '}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(task.task_id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
