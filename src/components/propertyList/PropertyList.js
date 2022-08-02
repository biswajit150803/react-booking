import React from "react";
import useFetch from "../../hooks/useFetch";
import "./Propertylist.css";

function PropertyList() {
  const { data, loading, error } = useFetch("/hotels/countByType");
  const images=[
    "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/285711651.jpg?k=f69009f1f11911cfde29f36b68d634029b83d92402abf027af3fcdbc7a9aeb8a&o=&hp=1",
    "https://blog.weekendthrill.com/wp-content/uploads/2018/05/052818_1420_20BestWeeke7.jpg",
    "https://anchorinc.com/media/featured-product-541x352.jpg"
  ]
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data && images.map((img,i)=>(
            <div className="pListItem" key={i}>
            <img
              className="pListImg"
              src={img}
              alt=""
            />
            <div className="pListTitles">
              <h1>{data[i]?.type}</h1>
              <h2>{data[i]?.count} {data[i]?.type}</h2>
            </div>
          </div>))}
          {/* <div className="pListItem">
            <img
              className="pListImg"
              src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/285711651.jpg?k=f69009f1f11911cfde29f36b68d634029b83d92402abf027af3fcdbc7a9aeb8a&o=&hp=1"
              alt=""
            />
            <div className="pListTitles">
              <h1>Appartments</h1>
              <h2>233 Appartments</h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              className="pListImg"
              src="https://blog.weekendthrill.com/wp-content/uploads/2018/05/052818_1420_20BestWeeke7.jpg"
              alt=""
            />
            <div className="pListTitles">
              <h1>Resorts</h1>
              <h2>233 Resorts</h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              className="pListImg"
              src="https://anchorinc.com/media/featured-product-541x352.jpg"
              alt=""
            />
            <div className="pListTitles">
              <h1>Tents</h1>
              <h2>233 Tents</h2>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}

export default PropertyList;
