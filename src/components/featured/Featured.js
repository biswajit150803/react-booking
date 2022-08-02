import React from 'react';
import useFetch from "../../hooks/useFetch";
import "./Featured.css";
function Featured() {
  const {data,loading,error}=useFetch("/hotels/countByCity?cities=madrid,berlin,new york");
  // console.log(data);
  return (
    <div className='featured'>
    {loading?"Loading plz wait":<><div className='featuredItem'>
        <img className='featuredImg'  src='https://cf.bstatic.com/xdata/images/city/square250/684765.webp?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o='
        />
        <div className='featuredTitles'>
        <h1>Berlin</h1>
        <h2>{data[0]} properties</h2>
        </div>
    </div>
    <div className='featuredItem'>
        <img  className='featuredImg' src='https://cf.bstatic.com/xdata/images/city/square250/971346.webp?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o='
        />
        <div className='featuredTitles'>
        <h1>Madrid</h1>
        <h2>{data[1]} properties</h2>
        </div>
    </div>
    <div className='featuredItem'>
        <img  className='featuredImg' src='https://cf.bstatic.com/xdata/images/city/square250/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o='
        />
        <div className='featuredTitles'>
        <h1>new york</h1>
        <h2>{data[2]} properties</h2>
        </div>
    </div>
    <div className='featuredItem'>
        <img  className='featuredImg' src='https://cf.bstatic.com/xdata/images/city/square250/684730.webp?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o='
        />
        <div className='featuredTitles'>
        <h1>Chennai</h1>
        <h2>143 properties</h2>
        </div>
    </div></>}
    </div>
  )
}

export default Featured