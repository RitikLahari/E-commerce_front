
import AdminProductDetail from "../features/admin/components/AdminProductdetail"
import ProductForm from "../features/admin/components/ProductForm"
import Navbar from "../features/navbar/navbar"


function AdminProductFormPage(){
    return (
        <div>
          <Navbar>
           <ProductForm></ProductForm>
          </Navbar>  
        </div>
    )
}

export default AdminProductFormPage 