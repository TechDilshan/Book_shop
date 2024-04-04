
import { useState } from 'react';


const AdminFrame = () => {
    const [adminName] = useState("Admin");

    

    const handleReportGeneration = () => {
    }

    const handleManageFeedback = () => {
    }


    return (
        <div className="admin-dashboard">
          <h2>Welcome, {adminName}</h2>
          <button>Logout</button>
          <div className="admin-options">
            <button onClick={handleReportGeneration}>Generate Report</button>
            <button onClick={handleManageFeedback}>Manage Feedback</button>
            {/* Add more buttons for other options */}
          </div>
          {/* Add your table component or any other content here */}
        </div>
      );
}

export default AdminFrame;