
import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/navbar"
import ProductList from "../features/product-list/components/ProductList"

function Home(){
    return (
        <div>
          <Navbar>
           <ProductList/>
          </Navbar>  
          <Footer/>
        </div>
    )
}

export default Home