import { Products } from "../../../../types/Products";
import ProductMini from "../ProductMini";
import "./index.css";

interface HorizontalCardGalleryProps {
  title: string;
  products: Products;
}

const HorizontalCardGallery = ({ products, title }: HorizontalCardGalleryProps) => {
  return (
    <div className="horizontal-card-gallery">
      <div className="horizontal-card-gallery__title">{title}</div>
      <div className="horizontal-card-gallery__slider">
        {products.map((product) => (<ProductMini key={`sale-product-${product}`} product={product} />))}
      </div>
    </div>
  );
};

export default HorizontalCardGallery;