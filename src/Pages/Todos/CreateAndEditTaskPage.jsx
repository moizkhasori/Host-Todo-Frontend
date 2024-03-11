import React, { useEffect, useState } from "react";
import PrioritySpanComponent from "./Components/PrioritySpanComponent";
import SelectComponent2 from "./Components/SelectComponentCreatePage.jsx";
import DueDate from "./Components/DueDate.jsx";
import StatusSpanComponent from "./Components/StatusSpanComponent.jsx";
import PencilSvg from "./SVG/CreateEditPage/PencilSvg.jsx";
import TickSvg from "./SVG/CreateEditPage/TickSvg.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneTask, removeTask } from "../../Redux/Todo/todoSlice.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DeleteTaskURL, UpdateTaskURL } from "../../BackendServerLinks.js";
import HomepageButton from "./Components/HomepageButton.jsx";
import DeleteTodoButton from "./Components/DeleteTodoButton.jsx";
import Loader from "../Loader.jsx";

const CreateAndEditTaskPage = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const {id} = useParams()

  const {currentTodoPage,isLoading} = useSelector(state => state.todo)
  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(fetchOneTask(id))
  }, [])

  useEffect(() => {
    setTitleViewEdit(currentTodoPage.title)
    setViewEditDescription(currentTodoPage.description)
    setViewEditPriority(currentTodoPage.priority)
    setViewEditStatus(currentTodoPage.status)
    setViewEditDuedate(currentTodoPage.duedate)
  }, [currentTodoPage])

  const [editmode, setEditMode] = useState(location.state?.isEditMode);

  const [titleViewEdit, setTitleViewEdit] = useState("")
  const [descriptionViewEdit,setViewEditDescription] = useState("")
  const [priorityViewEdit,setViewEditPriority] = useState("")
  const [statusViewEdit,setViewEditStatus] = useState("")
  const [duedateViewEdit,setViewEditDuedate] = useState("")

  const [internalError, setInternalError] = useState(null)


  async function handleUpdateTodo(){

    try {
      setInternalError(null)
      const ok = await axios.patch(`${UpdateTaskURL}/${id}`, {title:titleViewEdit,description:descriptionViewEdit,priority:priorityViewEdit,status:statusViewEdit,duedate:duedateViewEdit},{withCredentials:true})
      setEditMode(false)
    } catch (error) {
      setInternalError(error.message)
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

  if(isLoading){
    return <Loader />
  }

  return (
    <div className="bg-slate-900 w-full min-w-full min-h-[100vh] p-16 flex flex-col gap-8 justify-start items-start">

    <div className="flex gap-4 flex-wrap">
        <HomepageButton handelNavigateToHome={handelNavigateToHome} />
        {!editmode && <DeleteTodoButton onClickFunction={() =>deleteCard(id)} />}

     </div>
      
    {/* title */}
    <div className="w-[90%] title flex flex-col md:flex-row justify-between items-start">

    

      {editmode && (
        <input
          type="text"
          value={titleViewEdit}
          className="w-full md:w-[90%] outline-none p-6 md:pr-20 font-medium rounded-md"
          onChange={e => setTitleViewEdit(e.target.value)}
        />
      )}

      {!editmode && (
        <h1 className="font-semibold text-xl w-[90%]  max-w-[90%] opacity-80 text-white bg-slate-800 p-6 rounded-md">
          {titleViewEdit}
        </h1>
      )}

      <div className="mr-4 mt-1 relative">


        <div onClick={() => setEditMode((curr) => !curr)}>

          <div className={editmode? "border hover:border-black bg-green-300 hover:bg-green-400 p-4 rounded-md": "hidden"} onClick={handleUpdateTodo}>
            <TickSvg />
          </div>

          <div className={editmode ? "hidden" : "border border-gray-500 hover:border-white p-4 rounded-md"}>
            <PencilSvg />
          </div>

        </div>

      </div>
      
    </div>

    {internalError && <h1 className="text-red-500">{internalError}</h1>}

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
          className="w-full h-[450px] rounded-md p-8 md:pr-20 outline-none"
          onChange={e => setViewEditDescription(e.target.value)}
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
          <SelectComponent2 options={["Low", "Medium", "High"]} currentValue={priorityViewEdit}
            onChangeFunction={setViewEditPriority}/>
          <SelectComponent2
            options={["Pending", "InProgress", "Completed"]}
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

export default CreateAndEditTaskPage;
