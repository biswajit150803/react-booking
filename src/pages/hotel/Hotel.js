import React, { useContext, useState } from "react";
import "./Hotel.css";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/authContext";
import Reserve from "../../components/reserve/Reserve";
function Hotel() {
  const location = useLocation();
  // console.log(location);
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);
  const navigate = useNavigate();
  //  
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };
  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  // const photos = [
  //   {
  //     src: "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
  //   },
  //   {
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTspl5DQv_rjPSCdAEiDVe-NWz-BX7cnctw7Ijfb9C01BKhKppYZ0naPs1nOCgrAt9P-Nc&usqp=CAU",
  //   },
  //   {
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROIOt9XlGVDA9u4QIBGeFkS2Ih1JXK8_sZv2SpBKaiHe3EhxXM8H25hfalTpZLC2M6swk&usqp=CAU",
  //   },
  //   {
  //     src: "https://content.r9cdn.net/himg/9f/01/23/expediav2-8596-04f7b4-627505.jpg",
  //   },
  //   {
  //     src: "http://cdn.cnn.com/cnnnext/dam/assets/140127103345-peninsula-shanghai-deluxe-mock-up.jpg",
  //   },
  //   {
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlWu-KMSUrv6fkBv7hc_EK03g7uHD9CqHGlZ8tMh7y8zEwcOvJGBWkIYH7Hl6l_--CZcc&usqp=CAU",
  //   },
  // ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l")
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    else newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    setSlideNumber(newSlideNumber);
  };
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  }
    return (
      <div>
        <Navbar />
        <Header type="list" />
        {loading ? (
          "loading"
        ) : (
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <i
                  className="close fa-solid fa-circle-xmark"
                  onClick={() => setOpen(false)}
                ></i>
                <i
                  className="arrow fa-solid fa-circle-arrow-left"
                  onClick={() => handleMove("l")}
                ></i>
                <div className="sliderWrapper">
                  <img className="sliderImg" src={data.photos[slideNumber]} />
                </div>
                <i
                  className="arrow fa-solid fa-circle-arrow-right"
                  onClick={() => handleMove("r")}
                ></i>
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <i class="fa-solid fa-location-dot"></i>
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location:{data.distance}m from centre
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over at ${data.cheapestPrice} at this property and
                get a free airport taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper">
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1>{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-nights long stay!</h1>
                  <span>
                    Located in the real heart of Kroskow,this property has an
                    excellent location score of 9.8
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice * options.room}</b> ( {days}{" "}
                    nights )
                  </h2>
                  <button onClick={handleClick}>Reserve or book now</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        )}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      </div>
    );
  };

export default Hotel;
