import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importing the Launch Darkly provider to wrap our app for access to feature flags
import { asyncWithLDProvider, LDContext } from "launchdarkly-react-client-sdk";

// We are wrapping in an async iffy to use async/await
(async ()=> {
  // create the content for the Launch Darkly provider
  const context : { clientSideID: string, context: LDContext } = {
    clientSideID: "YourClientSideID",
    context: {
      // REQUIRED: what type of context are we setting
      kind: "user",
      // REQUIRED: add a unique key for tracking that context (every unique key will be tracked)
      key: "user-access-ExampleUser",
      // OPTIONAL: define custom attributes for the user context to track in LD
      username: "ExampleUser",
      region: "US",
      enrolledInBeta: true,
    }
  };

  // pass the context into the Provider
  const  LDProvider =  await asyncWithLDProvider(context);

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      {/* Wrap application with provider so feature flags are available */}
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>
  );

  reportWebVitals();
})();