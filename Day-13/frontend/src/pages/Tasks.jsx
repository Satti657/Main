import { useEffect, useState } from "react";
import API from "../api/axios";

function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const getTasks = async () => {

        try {

            const response = await API.get("/tasks");

            setTasks(response.data.data);

        } catch (err) {

            setError("Unable to fetch tasks");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        getTasks();

    }, []);



    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!title.trim()) {

            setError("Task title is required");
            return;

        }


        if (title.trim().length < 3) {

            setError("Task title must be at least 3 characters");
            return;

        }


        try {

            await API.post("/tasks", {
                title: title.trim()
            });


            setTitle("");

            getTasks();


        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to create task"
            );

        }

    };



    const handleDelete = async (id) => {

        try {

            await API.delete(`/tasks/${id}`);

            setError("");

            getTasks();


        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to delete task"
            );

        }

    };



    const handleUpdate = async (id) => {

        setError("");

        if (!editTitle.trim()) {

            setError("Task title is required");
            return;

        }


        if (editTitle.trim().length < 3) {

            setError("Task title must be at least 3 characters");
            return;

        }


        try {

            await API.put(`/tasks/${id}`, {

                title: editTitle.trim(),
                completed: false

            });


            setEditId(null);
            setEditTitle("");

            getTasks();


        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to update task"
            );

        }

    };



    if (loading) {

        return <h2>Loading...</h2>;

    }



    return (

        <div>

            <h1>My Tasks</h1>


            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />


                <button type="submit">
                    Add Task
                </button>

            </form>


            <br />


            {error && <p>{error}</p>}



            {
                tasks.length === 0 ? (

                    <p>No tasks found.</p>

                ) : (


                    tasks.map((task) => (

                        <div key={task.id}>


                            {
                                editId === task.id ? (

                                    <input
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(e.target.value)
                                        }
                                    />


                                ) : (

                                    <h3>
                                        {task.title}
                                    </h3>

                                )

                            }


                            <p>
                                Status:
                                {task.completed
                                    ? " Completed"
                                    : " Pending"}
                            </p>



                            <button
                                onClick={() => handleDelete(task.id)}
                            >
                                Delete
                            </button>


                            {" "}


                            {
                                editId === task.id ? (

                                    <button
                                        onClick={() =>
                                            handleUpdate(task.id)
                                        }
                                    >
                                        Save
                                    </button>


                                ) : (

                                    <button
                                        onClick={() => {

                                            setEditId(task.id);
                                            setEditTitle(task.title);

                                        }}
                                    >
                                        Edit
                                    </button>

                                )

                            }


                        </div>

                    ))

                )

            }


        </div>

    );

}


export default Tasks;