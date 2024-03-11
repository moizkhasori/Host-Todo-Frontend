import React, { useEffect, useRef, useState } from "react";
import EditAndDeleteModel from "./Components/EditAndDeleteModel";
import LinkRedirectIcon from "./Components/LinkRedirectIcon";
import DueDate from "./Components/DueDate";
import PrioritySpanComponent from "./Components/PrioritySpanComponent";
import StatusSpanComponent from "./Components/StatusSpanComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddDataCurrentTodoPage } from "../../Redux/Todo/todoSlice";


const TodoCard = ({
  title,
  description,
  priority,
  status,
  duedate,
  _id,
  isGrid,
  setOpenBigCard,
  setBigCardData,
  deleteCard,
}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function navigateToCreateEditPage(isEditMode){
    dispatch(AddDataCurrentTodoPage({title, description, priority, status, duedate, _id}))
    navigate(`/task/${_id}`, {state:{isEditMode}})
  }
  

  const [openThreeDots, setOpenThreeDots] = useState(false);

  function openClose3Dots() {
    setOpenThreeDots((curr) => !curr);
  }

  function handleBigCardDataAndOpen() {
    setOpenBigCard(true);
    setBigCardData({ title, description, priority, status, duedate, _id });
  }

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenThreeDots(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openThreeDots]);

  return (
    <div
      className={
        isGrid
          ? "bg-white p-8 rounded-md flex flex-col gap-4 justify-center items-start hover:-translate-y-2 transition-all w-96 h-96 relative"
          : "bg-white p-8 rounded-md flex flex-col gap-4 justify-center items-start hover:-translate-y-2 transition-all w-full relative"
      }
    >
      {/* title */}
      <div className="title flex justify-between items-start w-full">
        <h1
          className="font-semibold text-2xl w-64 max-h-24 overflow-hidden hover:bg-gray-100 rounded-md"
          onClick={() => handleBigCardDataAndOpen()}
        >
          {title}
        </h1>

        <EditAndDeleteModel
          onClickFunction={() => navigateToCreateEditPage(true)}
          openClose3Dots={openClose3Dots}
          openThreeDots={openThreeDots}
          deleteCard={deleteCard}
          modalRef={modalRef}
          _id={_id}
        />
      </div>

      <div
        className="w-full flex flex-col gap-4 justify-center items-start hover:bg-gray-100 rounded-md"
        onClick={() => handleBigCardDataAndOpen()}
      >
        {/* description */}
        <div className="description max-h-24 max-w-[90%] overflow-hidden">
          <p className="text-black opacity-80">{description}</p>
        </div>

        {/* Priority + Status + DueDate + Link div */}
        <div className="below w-full flex justify-between items-center">
          {/* priority + status + duedate */}
          <div className="left flex flex-col gap-2">
            <div className="pri_status flex gap-2 ">
              <PrioritySpanComponent text={priority} />
              <StatusSpanComponent text={status} />
            </div>
            <DueDate duedate={duedate} />
          </div>

          {/* link */}
          <LinkRedirectIcon onClickFunction={() => navigateToCreateEditPage(false)} />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
