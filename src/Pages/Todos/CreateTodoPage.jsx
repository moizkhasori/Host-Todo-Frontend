import React, { useEffect, useState } from "react";
import PrioritySpanComponent from "./Components/PrioritySpanComponent.jsx";
import SelectComponent from "./Components/SelectComponent";
import SelectComponent2 from "./Components/SelectComponentCreatePage.jsx";
import DueDate from "./Components/DueDate.jsx";
import StatusSpanComponent from "./Components/StatusSpanComponent.jsx";
import PencilSvg from "./SVG/CreateEditPage/PencilSvg.jsx";
import TickSvg from "./SVG/CreateEditPage/TickSvg.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchOneTask, removeTask } from "../../Redux/Todo/todoSlice.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CreateTasksURL, DeleteTaskURL, UpdateTaskURL } from "../../BackendServerLinks.js";
import HomepageButton from "./Components/HomepageButton.jsx";
import DeleteTodoButton from "./Components/DeleteTodoButton.jsx";
import Loader from "../Loader.jsx";

const CreateTodoPage = () => { 
  

  const { currentTodoPage, isLoading } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const navigate = useNavigate()
  const [trackTodoCreated, setTrackTodoCreated] = useState(true)
  const [editmode, setEditMode] = useState(true);

  const [titleViewEdit, setTitleViewEdit] = useState("");
  const [descriptionViewEdit, setViewEditDescription] = useState("");
  const [priorityViewEdit, setViewEditPriority] = useState("");
  const [statusViewEdit, setViewEditStatus] = useState("");
  const [duedateViewEdit, setViewEditDuedate] = useState("");

  const [internalError, setInternalError] = useState(null);
  const [id, setId] = useState(null)

  function handleEditMode(){
    if(titleViewEdit && descriptionViewEdit && (priorityViewEdit && priorityViewEdit.toLowerCase()!=="priority") && (statusViewEdit && statusViewEdit.toLowerCase()!=="status")){
        setEditMode((curr) => !curr)
      }else{
        setInternalError("All Fields are mandatory to create task!");
      }
  }

  async function handleCreateTodo(){
    try {
        setInternalError(null);
        if(titleViewEdit && descriptionViewEdit && (priorityViewEdit && priorityViewEdit.toLowerCase()!=="priority") && (statusViewEdit && statusViewEdit.toLowerCase()!=="status")){
            const todo = await axios.post(CreateTasksURL, {
                title: titleViewEdit,
                description: descriptionViewEdit,
                priority: priorityViewEdit,
                status: statusViewEdit,          
              }, {withCredentials:true});
      
              setId(todo.data.task._id)
              setTrackTodoCreated(false)
              setEditMode(false);
          }else{
            throw new Error("All Fields are mandatory to create task!")
          }
          
        

      } catch (error) {
        setInternalError(error.response?.data?.message || error.message);
      }
  }

  async function handleUpdateTodo() {
    try {
      setInternalError(null);

      if(!titleViewEdit || !descriptionViewEdit || priorityViewEdit.toLowerCase()==="priority" || statusViewEdit.toLowerCase()==="status"){
        throw new Error("All Fields are mandatory to create task!")
      }

      const ok = await axios.patch(`${UpdateTaskURL}/${id}`, {
        title: titleViewEdit,
        description: descriptionViewEdit,
        priority: priorityViewEdit,
        status: statusViewEdit,
      });
      setEditMode(false);
    } catch (error) {
      setInternalError(error.response?.data?.message || error.message);
    }
  }

  function handelNavigateToHome(){
    navigate("/")
  }

  async function deleteCard(_id){
    try {
      await axios.get(`${DeleteTaskURL}/${_id}`, {withCredentials:true})
      dispatch(removeTask({_id}));
      navigate("/")
    } catch (error) {
        setInternalError(error.response?.data?.message || error.message);
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="bg-slate-900 w-full min-w-full min-h-[100vh] p-16 flex flex-col gap-8 justify-start items-start">

     <div className="flex gap-4 flex-wrap">
        <HomepageButton handelNavigateToHome={handelNavigateToHome} />
        {!editmode && <DeleteTodoButton onClickFunction={() =>deleteCard(id)} />}
     </div>
     

        {internalError && <h1 className="text-red-500">{internalError}</h1>}

      {/* title */}
      <div className="w-[90%] title flex flex-col md:flex-row justify-between items-start">
        {editmode && (
          <input
            type="text"
            value={titleViewEdit}
            placeholder="Title"
            className="w-full md:w-[90%] outline-none p-6 md:pr-20 font-medium rounded-md"
            onChange={(e) => setTitleViewEdit(e.target.value)}
        
          />
        )}

        {!editmode && (
          <h1 className="font-semibold text-xl w-[90%]  max-w-[90%] opacity-80 text-white bg-slate-800 p-6 rounded-md">
            {titleViewEdit}
          </h1>
        )}

        <div className="mr-4 mt-1 relative">
          <div onClick={handleEditMode}>
            <div
              className={
                editmode
                  ? "border hover:border-black bg-green-300 hover:bg-green-400 p-4 rounded-md"
                  : "hidden"
              }
              onClick={trackTodoCreated ? handleCreateTodo : handleUpdateTodo}
            >
              <TickSvg />
            </div>

            <div
              className={
                editmode
                  ? "hidden"
                  : "border border-gray-500 hover:border-white p-4 rounded-md"
              }
            >
              <PencilSvg />
            </div>
          </div>
        </div>


      </div>

      

      {/* description */}
      <div className="description w-full md:w-[90%] overflow-hidden">
        {!editmode && (
          <p className=" opacity-80 text-white bg-slate-800 p-6 rounded-md">
            {descriptionViewEdit}
          </p>
        )}
        {editmode && (
          <textarea
            value={descriptionViewEdit}
            placeholder="Description"
            className="w-full h-[450px] rounded-md p-8 md:pr-20 outline-none"
            onChange={(e) => setViewEditDescription(e.target.value)}
          />
        )}
      </div>

      {/* priority + status + duedate */}
      <div className="flex flex-col gap-6">
        {!editmode && (
          <div className="pri_status flex gap-2 ">
            <PrioritySpanComponent text={priorityViewEdit} />
            <StatusSpanComponent text={statusViewEdit} />
          </div>
        )}

        {editmode && (
          <div className="flex gap-2 flex-col md:flex-row">
            <SelectComponent2
              options={["Priority","Low", "Medium", "High"]}
              currentValue={priorityViewEdit}
              onChangeFunction={setViewEditPriority}
            />
            <SelectComponent2
              options={["Status","Pending", "InProgress", "Completed"]}
              currentValue={statusViewEdit}
              onChangeFunction={setViewEditStatus}
            />
          </div>
        )}

        <div className="text-white">
          <DueDate duedate={duedateViewEdit} />
        </div>
      </div>

    </div>
  );
};

export default CreateTodoPage;
