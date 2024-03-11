import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Redux
import { fetchAllTasks, removeTask } from "../../Redux/Todo/todoSlice";

//Components
import TodoCard from "./TodoCard";
import CardOpen from "./CardOpen";
import SearchBarSection from "./SearchBarSection";
import NoTaskFound from "./Components/NoTaskFound";
import Loader from "../Loader"
import { DeleteTaskURL } from "../../BackendServerLinks";
import { Navigate } from "react-router-dom";



const TodoMainPage = () => {

  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.todo);
  const { isLoggedin } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);


  const [cardsInGrid, setCardsInGrid] = useState(true);
  const [openBigCard, setOpenBigCard] = useState(false);
  const [BigCardData, setBigCardData] = useState({title: "", description: "", status: "", priority: "", duedate: "", _id:null});
  const [internalError, setInternalError] = useState(null)
  

  async function deleteCard(_id){
    try {
      setInternalError(null)
      await axios.get(`${DeleteTaskURL}/${_id}`, {withCredentials:true})
      dispatch(removeTask({_id}));
    } catch (error) {
      setInternalError(error.response?.data?.message || error.message)
    }
  }

  if(!isLoggedin){
    return <Navigate to={"/login"} />
  }

  if(isLoading){
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-slate-900">

      { openBigCard && <CardOpen title={BigCardData.title} description={BigCardData.description} status={BigCardData.status} priority={BigCardData.priority} duedate={BigCardData.duedate} setOpenBigCard={setOpenBigCard} deleteCard={deleteCard} _id={BigCardData._id}/> }


      <SearchBarSection openBigCard={openBigCard} cardsInGrid={cardsInGrid} setCardsInGrid={setCardsInGrid} />
      {internalError && <h1 className="bg-red-500 w-4/5 mx-auto">{internalError}</h1>}
      <div className={openBigCard ? `bg-slate-900 flex justify-center items-center w-screen h-screen p-8 overflow-hidden`: `bg-slate-900 flex justify-center items-center p-8`}>
        
        
        {data.length < 1 && <NoTaskFound /> }

        {data.length >= 1 && <div className={cardsInGrid? "rounded-md flex justify-center items-center gap-6 flex-wrap h-full bg-slate-800 min-w-[84%] w-[83%] p-4": "rounded-md flex flex-col justify-center items-center gap-6 min-w-[84%] w-[83%] p-4"}>
          
            {data && data.map((item) => (
              <TodoCard
                key={item._id}
                _id={item._id}
                title={item.title}
                description={item.description}
                status={item.status}
                priority={item.priority}
                duedate={item.duedate}
                isGrid={cardsInGrid}
                setOpenBigCard={setOpenBigCard}
                setBigCardData={setBigCardData}
                deleteCard={deleteCard}
                
              />
            ))}
        </div>}

      </div>
      
    </div>
  );
};

export default TodoMainPage;


