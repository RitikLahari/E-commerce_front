
import AdminProductList from "../features/admin/components/AdminProductlist"
import Navbar from "../features/navbar/navbar"

function AdminHome(){
    return (
        <div>
          <Navbar>
            <AdminProductList></AdminProductList>
          </Navbar>  
        </div>
    )
}

export default AdminHome