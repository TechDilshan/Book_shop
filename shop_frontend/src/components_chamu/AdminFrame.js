
import logo from  '../image/logo.jpg';
import React, { useState } from 'react';
import AdminFeedbackPage from './AdminFeedbackPage';
import FeedbackReport from './FeedbackReport';
import { useNavigate} from 'react-router-dom'
import axios from 'axios'



const AdminFrame = () => {
    const [currentPage, setCurrentPage] = useState('feedback'); // Initial page is feedback
    const navigate = useNavigate()
    const navigateToFeedbackPage = () => setCurrentPage('feedback');
    const navigateToReportPage = () => setCurrentPage('report');

  const [adminName] = useState("Admin");

  const handleLogout =()=>{
    axios.get('http://localhost:5000/auth/logout')
    .then(res => {
      if(res.data.status){
        sessionStorage.removeItem('userEmail');
        //window.location.reload();
        navigate('/')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
<div class="container m-auto p-5">
    <div class="flex items-center justify-between">
        <div class="w-1/4">
            <img src={logo} alt="Logo" class="w-32 h-auto"/>
        </div>

        <div class="w-1/2 text-center">
            <h1 class="text-4xl font-bold text-indigo-700">Admin Dashboard</h1>
            <h4 class="text-lg text-gray-700">--Reviews and Feedback Management--</h4>
        </div>

        <div class="w-1/4 flex justify-end items-center space-x-4">
            <div class="relative group">
                <button class="bg-purple-600 text-white rounded-full p-2 focus:outline-none focus:ring focus:border-blue-300">
                <a href="/feedprofile" target="iframe_a" class="block text-white"><i class='far fa-user-circle text-xl'></i></a>
                </button>

            </div>

            <div class="relative group">
                <p class="text-lg text-gray-700">Welcome, {adminName} </p>
                <button class="bg-gray-800 text-white rounded-md p-2" onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </div>
    </div>

    <hr class="my-4 border-t-2 border-orange-500"/>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
    <div class="col-span-1 lg:col-span-1">
            
            <a href="/feedbackadmin" target="iframe_a" class="block text-center mt-4">
                <button class="bg-indigo-700 text-white rounded-md py-4 w-full font-bold" onClick={navigateToFeedbackPage}>Display Reviews</button>
            </a>           
            
             <a href="/adminreport" target="iframe_a" class="block text-center mt-4">
                <button class="bg-indigo-700 text-white rounded-md py-4 w-full font-bold" onClick={navigateToReportPage}>Generate Report</button>
            </a>
        </div>

        <div class="col-span-1 lg:col-span-4">
            <iframe src="/feedbackadmin" name="iframe_a" height="550px" width="100%" title="Iframe Example"></iframe>
        </div>
    </div>

    
</div>
  );
}




// const AdminFrame = () => {
//     const [adminName] = useState("Admin");

    

//     const handleReportGeneration = () => {
//     }

//     const handleManageFeedback = () => {
//     }


//     return (
//         <div className="admin-dashboard">
//           <h2>Welcome, {adminName}</h2>
//           <button>Logout</button>
//           <div className="admin-options">
//             <button onClick={handleReportGeneration}>Generate Report</button>
//             <button onClick={handleManageFeedback}>Manage Feedback</button>
//             {/* Add more buttons for other options */}
//           </div>
//           {/* Add your table component or any other content here */}
//         </div>
//       );
// }

export default AdminFrame;