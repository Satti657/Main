import { useEffect, useState } from "react";
import API from "../api/axios";


function Tasks(){

    const [tasks,setTasks] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");


    useEffect(()=>{

        const getTasks = async()=>{

            try{

                const response = await API.get("/tasks");

                setTasks(response.data.data);

            }
            catch(err){

                setError("Unable to fetch tasks");

            }
            finally{

                setLoading(false);

            }

        };


        getTasks();

    },[]);



    if(loading){
        return <h2>Loading...</h2>
    }


    if(error){
        return <h2>{error}</h2>
    }


    return(
        <div>

            <h1>My Tasks</h1>

            {
                tasks.map((task)=>(
                    <div key={task.id}>

                        <h3>{task.title}</h3>

                        <p>
                            Status:
                            {task.completed ? " Completed":" Pending"}
                        </p>

                    </div>
                ))
            }


        </div>
    )

}


export default Tasks;