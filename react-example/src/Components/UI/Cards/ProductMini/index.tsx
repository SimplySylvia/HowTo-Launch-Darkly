import {Product} from "../../../../types/Products";
import "./index.css";

interface ProductMiniProps {
  product: Product
}

const ProductMini = ({ product: {image, video, finalPrice, originalPrice, discount} }:ProductMiniProps) => {
  return (<a href="#" className="card-mini">
    <div className="card-mini__game">
      <img src={image} alt=""/>
      <video autoPlay={true} loop muted>
        <source src={video} type="video/webm"/>
      </video>
    </div>
    {discount ?  (<div className="card-mini__discount">
      <span className="discount_percent">{discount}</span>
      <div className="discount_prices">
        <div className="discount_prices__original">{originalPrice}</div>
        <div className="discount_prices__final">{finalPrice}</div>
      </div>
    </div>) :
    (<div className="card-mini__discount">
      <div className="discount_prices">
        <div className="discount_prices__final">{finalPrice}</div>
      </div>
    </div>) }
  </a>)
};

export default ProductMini;