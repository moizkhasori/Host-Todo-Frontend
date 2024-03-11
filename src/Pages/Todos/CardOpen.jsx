import React, { useEffect, useRef, useState } from "react";
import EditAndDeleteModel from "./Components/EditAndDeleteModel";
import LinkRedirectIcon from "./Components/LinkRedirectIcon";
import DueDate from "./Components/DueDate";
import PrioritySpanComponent from "./Components/PrioritySpanComponent";
import StatusSpanComponent from "./Components/StatusSpanComponent";
import { useDispatch } from "react-redux";
import { AddDataCurrentTodoPage } from "../../Redux/Todo/todoSlice";
import { useNavigate } from "react-router-dom";

const CardOpen = ({
  title,
  description,
  priority,
  status,
  duedate,
  isGrid,
  setOpenBigCard,
  _id,
  deleteCard,
}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [openThreeDots, setOpenThreeDots] = useState(false);

  function openClose3Dots() {
    setOpenThreeDots((curr) => !curr);
  }

  const maindivref = useRef();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (maindivref.current && !maindivref.current.contains(event.target)) {
        setOpenBigCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleDeleteAndModelClose() {
    deleteCard(_id);
    setOpenBigCard(false);
  }

  function navigateToCreateEditPage(isEditMode){
    dispatch(AddDataCurrentTodoPage({title, description, priority, status, duedate, _id}))
    navigate(`/task/${_id}`, {state:{isEditMode}})
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-400 absolute bg-opacity-40 z-20">
      <div
        className="bg-white p-8 rounded-md flex flex-col gap-4 justify-center items-start hover:-translate-y-2 transition-all w-4/5"
        ref={maindivref}
      >
        {/* title */}
        <div className="title flex justify-between items-start w-full">
          <h1 className="font-semibold text-2xl w-4/5 max-h-24 overflow-hidden ">
            {title}
          </h1>

          <EditAndDeleteModel
          onClickFunction={() => navigateToCreateEditPage(true)}
            openClose3Dots={openClose3Dots}
            openThreeDots={openThreeDots}
            deleteCard={handleDeleteAndModelClose}
            modalRef={modalRef}
            _id={_id}
          />
        </div>

        {/* description */}
        <div className="description max-h-96 max-w-[90%] overflow-hidden">
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

export default CardOpen;
