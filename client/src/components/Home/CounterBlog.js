import React from 'react';
import CountUp from 'react-countup';

const counterData = [
    {number:"23577", title:"Total Donor" },
    {number:"978", title:"Donations" },
    {number:"762", title:"Happy Clients" },
    {number:"852", title:"Volunteer" },
];

const CounterBlog = () => {
    return (
        <>
          {counterData.map((data, index)=>(
            <div className="col-lg-3 col-6 m-b30" key={index}>
                <div className="counter-style-1 text-center">
                    <span className="counter counter-num">
                        <CountUp 
                            end={data.number} 
                            separator = ","
                            duration= "3"
                        />
                    </span>
                    <p className="counter-text">{data.title}</p>
                </div>
            </div>  
          ))}
        </>
    );
};


export default CounterBlog;