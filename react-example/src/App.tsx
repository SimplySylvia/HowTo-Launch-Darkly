import React from 'react';
import './App.css';
import HorizontalCardGallery from "./Components/UI/Cards/HorizontalCardGallery";

import products_upcoming from "./db/mocks/products_upcoming.json";
import products_sale from "./db/mocks/products_sale.json";

// Bring in the useFlags hook from the LaunchDarkly SDK, so we can track our feature flags
import { useFlags } from "launchdarkly-react-client-sdk";

function App() {
  // Use the useFlags hook to get the value of the feature flag
  const flags = useFlags();

  return (
    <div className="App">
      <HorizontalCardGallery title={"🕐 Upcoming Releases"} products={products_upcoming} />
      {/* Conditional for validating the boolean value of the flag */}
      {flags.salesHighlight && <HorizontalCardGallery title={"Save some money with this 🔥 sale!"} products={products_sale}/>}
    </div>
  );
}

export default App;
