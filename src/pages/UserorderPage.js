import Navbar from "../features/navbar/navbar";
import UserOrders from "../features/user/components/UserOrder";



function UserOrdersPage() {
    return (
      <div>
          <Navbar>
          <h1 className='mx-auto text-2xl'>My Orders</h1>
            <UserOrders></UserOrders>
          </Navbar>
         
           
      </div>
    );
  }
  
  export default UserOrdersPage;