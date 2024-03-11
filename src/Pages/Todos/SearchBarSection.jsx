import React, { useEffect, useState } from "react";
import SelectComponent from "./Components/SelectComponent";
import ShowCardsInGridSVG from "./Components/ShowCardsInGridSVG";
import ShowCardsInRectangles from "./Components/ShowCardsInRectangles";
import { useDispatch } from "react-redux";
import {
  addTaskStateUpdateViaFilter,
  filterTasksOnTitle,
} from "../../Redux/Todo/todoSlice";
import axios from "axios";
import { GetAllTasksURL } from "../../BackendServerLinks";
import { useNavigate } from "react-router-dom";

const SearchBarSection = ({ openBigCard, cardsInGrid, setCardsInGrid }) => {

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const [searchTodoTitle, setSearchTodoTitle] = useState("");

  function handleChangeInputField(e) {
    setSearchTodoTitle(e.target.value);
  }
  
  // dispatching in useEffect as shift+backspace dont work if dispatch done only in handleChangeInputField Function
  useEffect(() => {
    dispatch(filterTasksOnTitle({ title: searchTodoTitle }));
  }, [searchTodoTitle]);

  const [priority, setPriority] = useState("Priority");
  const [status, setStatus] = useState("Status");
  const [dueDate, setDueDate] = useState("");

  // reset is true, if filteres change button enable and reset false, if filters applied and searched, reset true, now if filters clear, as reset true button still enabled, when now searched reset false, and button disables too
  const [disableButtonOnFilter, setDisableButtonOnFilter] = useState(true);
  const [resetFunctionalityTrack, setResetFunctionalityTrack] = useState(true);

  useEffect(() => {
    if (
      priority.toLocaleLowerCase() !== "priority" ||
      status.toLocaleLowerCase() !== "status"
    ) {
      setDisableButtonOnFilter(false);
    } else {
      setDisableButtonOnFilter(true && resetFunctionalityTrack);
    }
  }, [priority, status, resetFunctionalityTrack]);

  const fetchTasksonFilters = async () => {
    let filterSTR = "?";

    if (priority.toLocaleLowerCase() !== "priority") {
      filterSTR += `priority=${priority}&`;
    }
    if (status.toLocaleLowerCase() !== "status") {
      filterSTR += `status=${status}&`;
    }

    const data = await axios.get(`${GetAllTasksURL}${filterSTR}`, {
      withCredentials: true,
    });
    dispatch(addTaskStateUpdateViaFilter({ data: data.data.tasks }));

    if (resetFunctionalityTrack) {
      setResetFunctionalityTrack(false);
    } else {
      setResetFunctionalityTrack(true);
    }
  };

  function navigateToCreatePage(){
    navigate(`/createtest`)
  }

  return (
    <div
      className={
        openBigCard
          ? "hidden"
          : "w-full bg-slate-900 border-white flex justify-center items-center py-24"
      }
    >
      <div className="w-4/5 rounded-md flex flex-col xl:flex-row gap-4 justify-between items-center">
        <div className="left w-3/4 h-full flex flex-col gap-4 justify-center items-start">
          <input
            type="text"
            placeholder="Search for todos title"
            className="w-full p-6 rounded-md focus:outline-none hover:translate-y-1 hover:transition-all"
            value={searchTodoTitle}
            onChange={handleChangeInputField}
          />

          <div className="flex w-full justify-center sm:justify-center lg:justify-between items-center flex-wrap lg:flex-nowrap gap-2">
            <div className="w-full lg:w-1/4 overflow-hidden hover:translate-y-1 hover:transition-all">
              <SelectComponent
                options={["Priority", "Low", "Medium", "High"]}
                onChangeFunction={setPriority}
                value={priority}
              />
            </div>

            {/* <div className="w-full lg:w-1/4 overflow-hidden hover:translate-y-1 hover:transition-all">
              <select className="w-full p-4 rounded-md outline-none">
                <option>Status</option>
                <option>Pending</option>
                <option>InProgress</option>
                <option>Completed</option>
              </select>
            </div> */}
            <div className="w-full lg:w-1/4 overflow-hidden hover:translate-y-1 hover:transition-all">
              <SelectComponent
                options={["Status", "Pending", "InProgress", "Completed"]}
                onChangeFunction={setStatus}
                value={status}
              />
            </div>

            <div className="w-full lg:w-1/4 overflow-hidden hover:translate-y-1 hover:transition-all">
              <SelectComponent
                options={[
                  "Due Date",
                  "Less than 24 hours",
                  "Less than 3 days",
                  "Less than a week",
                ]}
              />
            </div>

            <div className="w-full lg:w-1/4 flex gap-2">
              <button
                onClick={fetchTasksonFilters}
                disabled={disableButtonOnFilter}
                className={`w-full p-4 rounded-md ${
                  disableButtonOnFilter ? `bg-gray-300` : "bg-blue-500"
                } hover:translate-y-1 hover:transition-all`}
              >
                Apply Filters
              </button>
              <div
                className="bg-gray-300 hover:bg-white rounded flex justify-center items-center p-4 hover:translate-y-1 transition-all"
                onClick={() => setCardsInGrid((prev) => !prev)}
              >
                {!cardsInGrid && <ShowCardsInGridSVG />}
                {cardsInGrid && <ShowCardsInRectangles />}
              </div>
            </div>
          </div>
        </div>

        <div className="right w-3/4 xl:w-1/4 h-full flex justify-center items-center" onClick={() => navigateToCreatePage(true)}>
          <span className="w-full p-4 lg:h-36 hover:-translate-y-1 hover:transition-all rounded-md bg-green-500 hover:text-white flex justify-center items-center">
            Add Task
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBarSection;
