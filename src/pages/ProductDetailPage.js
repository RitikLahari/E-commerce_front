
import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/navbar"
import ProductDetail from "../features/product-list/components/Productdetail"


function ProductDetailPage(){
    return (
        <div>
          <Navbar>
            <ProductDetail></ProductDetail>
          </Navbar> 
          <Footer/> 
        </div>
    )
}

export default ProductDetailPage 