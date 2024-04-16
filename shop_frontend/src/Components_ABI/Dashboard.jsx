import React from 'react'
import './Dashboard.css';
import {DashboardData} from './DashboardData'

const Dashboard = () => {


  return (
        <div className='Dashboard'>
            <ul className='DashboardList'> 
                {DashboardData.map((val,key)=>{
                    return(
                        <li
                        className='row'
                        key = {key}
                        id ={window.location.pathname === val.link ? "active" : ""}
                        onClick={() =>{
                            window.location.pathname = val.link;
                        }}
                        >
                           <div id='icon'>{val.icon}</div>
                           <div id='title'>{val.title}</div>
                        </li>
                    );
                })}
            </ul>
           </div>
 
  )
}

export default Dashboard