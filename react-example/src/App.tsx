import React from 'react';
import './App.css';
import HorizontalCardGallery from "./Components/UI/Cards/HorizontalCardGallery";

import products_upcoming from "./db/mocks/products_upcoming.json";
import products_sale from "./db/mocks/products_sale.json";

function App() {
  return (
    <div className="App">
      <HorizontalCardGallery title={"🕐 Upcoming Releases"} products={products_upcoming} />
      <HorizontalCardGallery title={"Save some money with this 🔥 sale!"} products={products_sale}/>
    </div>
  );
}

export default App;
