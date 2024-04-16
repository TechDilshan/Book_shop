
import { useState } from 'react';




function AdminFrame() {

  const [adminName] = useState("Admin");

  return (
<div class="container mx-auto">
    <div class="flex items-center justify-between py-4">
        <div class="w-1/4">
            <img src="" alt="Logo" class="w-32 h-auto"/>
        </div>

        <div class="w-1/2 text-center">
            <h1 class="text-4xl font-bold text-indigo-700">Admin Dashboard</h1>
            <h4 class="text-lg text-gray-700">--Reviews and Feedback Management--</h4>
        </div>

        <div class="w-1/4 flex justify-end items-center space-x-4">
            <div class="relative group">
                <button class="bg-purple-600 text-white rounded-full p-2 focus:outline-none focus:ring focus:border-blue-300">
                    <i class='far fa-user-circle text-xl'></i>
                </button>
                <div class="hidden absolute right-0 mt-2 space-y-2 bg-green-500 p-2 rounded-md">
                    <a href="profilesetting.php" target="iframe_a" class="block text-white">Change Profile</a>
                    <a href="logout" class="block text-white">Logout</a>
                </div>
            </div>

            <div class="relative group">
                <p class="text-lg text-gray-700">Welcome, {adminName} </p>
                <button class="bg-gray-800 text-white rounded-md p-2">
                    Logout
                </button>
                <div class="hidden absolute right-0 mt-2 space-y-2 bg-green-500 p-2 rounded-md">
                    <a href="profilesetting.php" target="iframe_a" class="block text-white">Change Profile</a>
                    <a href="logout" class="block text-white">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <hr class="my-4 border-t-2 border-orange-500"/>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div class="col-span-1 lg:col-span-1">
            
            <a href="promopage" target="iframe_a" class="block text-center mt-4">
                <button class="bg-indigo-700 text-white rounded-md py-4 w-full font-bold">Generate Report</button>
            </a>
        </div>

        <div class="col-span-1 lg:col-span-4">
            <iframe src="https://prepbytes-misc-images.s3.ap-south-1.amazonaws.com/assets/1695627565745-Topic%20%2862%29.jpg" name="iframe_a" height="700px" width="100%" title="Iframe Example"></iframe>
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