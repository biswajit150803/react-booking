import React, { useContext, useState } from "react";
import { SearchContext } from "../../context/searchContext";
import useFetch from "../../hooks/useFetch";
import "./Reserve.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Reserve({ setOpen, hotelId }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loaidng, error } = useFetch(`room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const navigate=useNavigate();
//   console.log(selectedRooms);
  const handleClick =async () => {
    try{
        await Promise.all(selectedRooms.map((roomId)=>{
            const res=axios.put(`/rooms/availability/${roomId}`,{dates:alldates})
            return res.data
        }))
        setOpen(false)
        navigate("/")
    }catch(err){}
  };
  return (
    <div className="reserve">
      <div className="reserveContainer">
        <i
          className="rclose fa-solid fa-circle-xmark"
          onClick={() => setOpen(false)}
        ></i>
        <span>Select Your Rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>{" "}
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectedRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  ></input>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now
        </button>
      </div>
    </div>
  );
}

export default Reserve;
