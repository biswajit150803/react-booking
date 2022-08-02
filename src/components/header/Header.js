import React, { useContext, useState } from "react";
import "./Header.css";
import { DateRange } from "react-date-range";
//for calender appearance
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { setDate } from "date-fns";
import { format } from "date-fns";
import {useNavigate} from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/authContext";
function Header({type}) {
  //type is used so that in other pages only the items with type list are displayed
  const [openDate, setOpenDate] = useState(false);
  const [destination,setDestination]=useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate=useNavigate();
  const {user}=useContext(AuthContext)
  const {dispatch}=useContext(SearchContext)
  const handleSearch=()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
    navigate("/hotels",{state:{destination,dates,options}});
  }
  return (
    <div className="header">
      <div className={type==="list"?"headerContainer listMode":"headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <i className="header-icons fa-solid fa-bed"></i>
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <i className="header-icons fa-solid fa-plane-departure"></i>
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <i className="header-icons fa-solid fa-car"></i>header-icons
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <i className="header-icons fa-solid fa-bed"></i>
            <span>Attractions</span>
          </div>
          <div div className="headerListItem">
            <i className="header-icons fa-solid fa-taxi"></i>
            <span>Airport Taxis</span>
          </div>
        </div>
        {type!=="list" && <><h1 className="headerTitle">A lifetime of discount!Its genius</h1>
        <p className="headerDesc">
          Get rewarded for your travels.Unlock istant savings of 10% or more
          with a free Lambooking account
        </p>
        {!user && <button className="headerButton">Sign In/Register</button>}
        <div className="headerSearch">
          <div className="headerSearchItem">
            <i className="headerIcon fa-solid fa-bed"></i>
            <input
              type="text"
              placeholder="Where are you going?"
              className="headerInput"
              onChange={e=>setDestination(e.target.value)}
            />
          </div>
          <div className="headerSearchItem">
            <i className="headerIcon fa-solid fa-calendar"></i>
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >
              {`${format(dates[0].startDate, "dd/MM/yyyy")}to ${format(
                dates[0].endDate,
                "dd/MM/yyyy"
              )}`}{" "}
            </span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="headerSearchItem">
            <i className="headerIcon fa-solid fa-person-dress"></i>
            <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
            {openOptions && <div className="options">
              <div className="optionItem">
                <span className="optionsText">Adult</span>
                <div className="optionCounter">
                  <button disabled={options.adult<=1}
                    className="counterButton"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button 
                    className="counterButton"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionsText">Children</span>
                <div className="optionCounter">
                  <button disabled={options.children<=0}
                    className="counterButton"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.children}</span>
                  <button
                    className="counterButton"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionsText">Room</span>
                <div className="optionCounter">
                  <button disabled={options.room<=1}
                    className="counterButton"
                    onClick={() => handleOption("room", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button
                    className="counterButton"
                    onClick={() => handleOption("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>}
          </div>
          <div className="headerSearchItem">
            <button className="headerButton" onClick={handleSearch}>Search</button>
          </div>
        </div></>}
      </div>
    </div>
  );
}
export default Header;
