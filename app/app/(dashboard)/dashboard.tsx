import { FunctionComponent } from "react";
import Navbar from "../(components)/navbar";

interface DashboardProps {
    
}
 
const Dashboard: FunctionComponent<DashboardProps> = () => {
    return (  
        <div className="flex gap-4 p-4">
            <Navbar />
        </div>
    );
}
 
export default Dashboard;