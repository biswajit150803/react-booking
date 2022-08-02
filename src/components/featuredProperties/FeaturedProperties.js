import React from "react";
import useFetch from "../../hooks/useFetch";
import "./FeaturedProperties.css";
function FeaturedProperties() {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  return (
    <div className="fp">
      {loading ? 
        "loading"
       : 
        <>
          {data.map(item=>(<div className="fpItem" key={item._id}>
            <img
              className="fpImg"
              src={item.photos[0]}
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            {item.rating && <div className="fpRating">
              <button className="">{item.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>
          ))}
        </>
      }
      {/* <div className="fpItem">
    <img className="fpImg" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/72282092.jpg?k=5eeba7eb191652ce0c0988b4c7c042f1165b7064d865b096bb48b8c48bf191b9&o=&hp=1" />
      <span className="fpName">Apartment Hotels</span>
      <span className="fpCity">Kolkata</span>
      <span className="fpPrice">Starting from $120</span>
      <div className="fpRating">
      <button className="">8.9</button> 
      <span>Excellent</span>       
      </div>
      </div>
      <div className="fpItem">
    <img className="fpImg" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/72282092.jpg?k=5eeba7eb191652ce0c0988b4c7c042f1165b7064d865b096bb48b8c48bf191b9&o=&hp=1" />
      <span className="fpName">Apartment Hotels</span>
      <span className="fpCity">Kolkata</span>
      <span className="fpPrice">Starting from $120</span>
      <div className="fpRating">
      <button className="">8.9</button> 
      <span>Excellent</span>       
      </div>
    </div>
    <div className="fpItem">
    <img className="fpImg" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/72282092.jpg?k=5eeba7eb191652ce0c0988b4c7c042f1165b7064d865b096bb48b8c48bf191b9&o=&hp=1" />
      <span className="fpName">Apartment Hotels</span>
      <span className="fpCity">Kolkata</span>
      <span className="fpPrice">Starting from $120</span>
      <div className="fpRating">
      <button className="">8.9</button> 
      <span>Excellent</span>       
      </div>
    </div> */}
    </div>
  );
}

export default FeaturedProperties;
