import React from "react";
import "./SearchItem.css";
function SearchItem({ item }) {
  return (
    <div className="searchItem">
      <img className="siImg" src={item.photos[0]} alt="" />
      <div className="siDesc">
        <h1 className="siTitles">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxOp">Free Airport Taxi</span>
        <span className="siSubtitle">
          Studio Apartment with air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free Cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later,so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailsText">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siPrice">Includes taxes and fees</span>
          <a href={`/hotels/${item._id}`}>
            <button className="siCheckButton">See Availability</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
