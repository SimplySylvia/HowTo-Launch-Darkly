# HOW TO: Launch Darkly 
In this breakdown we will be going over how to set up and leverage a Launch Darkly project for feature flagging.
> NOTE: This repo contains the finalized for this setup.

## Prerequisites
- [ ] Launch Darkly Account
- [ ] React Project OR you can leverage the existing project in this repo under `react-example` 
- [ ] All necessary dependencies for a React project (IE. Node and etc)

> NOTE: If you are using the example project in this repo, you can run `npm install` to install all the necessary dependencies. It is a typescript project so you will need to have minimal knowledge of typescript to understand the code.

## 🗺 Roadmap
1. Set up 📁 Launch Darkly Project and 🏗 Environment
2. Set up 🛠 Launch Darkly SDK for React
3. Create a 🚩 feature flag in Launch Darkly Console
4. Implement 🛠 feature flag in React

## Set up 📁 Launch Darkly Project and 🏗 Environments
Once you are logged into Launch Darkly, you will be greeted with the following screen:

![Launch Darkly Dashboard](./assets/setup_project/launch-darkly-dashboard.png)
By default, you will be provided a project (name will be based on the organization name you provide during the signup process) with two environments: `Production` and `Test`. You can provide additional environments as needed. This can be done under `Account Settings` -> `Projects` -> `Name of Project` -> `Environments` -> `Add Environment`. 

![Launch Darkly Environments](./assets/setup_project/environments.png)
> NOTE: Each of these environments will have their own unique SDK key that you will need to leverage in your application. How that key is loaded will be determined by how your application is split across different environments. 
> 
>As an example: 
> Pipeline points to a specific vault environment which returns the SDK key the run process. This allows the application to load the correct SDK key based on the environment it is being deployed to. 

To set up a new project navigate to `Account Settings` -> `Projects` -> `Create New Project`. You will be greeted with the following screen:

![Launch Darkly Create Project](./assets/setup_project/project-page.png)

Here you can select create new project and fill in the name of the project you would like to start. 
For  this example we will be creating a project called `HOWTO: Launch Darkly` and let Launch Darkly determine the key.
> NOTE: `Key` is what Launch Darkly uses to identify the project and provide user-friendly urls in the dashboard.

![Launch Darkly Project Created](./assets/setup_project/project-setup.png)

Once the project is created you will be greeted with the following screen.

![Launch Darkly Project Dashboard](./assets/setup_project/new-project-details.png)
Here we will now have our default environments and project keys available to use. With this information we can set up our React project to leverage the Launch Darkly SDK.

## Set up 🛠 Launch Darkly SDK for React
Our next step is to set up the Launch Darkly SDK in our React project. To do this we will need to install the SDK and set up the configuration to load the SDK and connect to the correct project and environment.

To setup the SDK we will be leveraging the `launchdarkly-react-client-sdk` package. This package provides a variety of hooks and components to interact with the Launch Darkly SDK. 

You can view the package on [npm](https://www.npmjs.com/package/launchdarkly-react-client-sdk). 

Install the SDK by running the following command in your React project directory:
```bash
npm install launchdarkly-react-client-sdk
```
> NOTE: You can use any node package installer you prefer. Here I am using base npm as an example.
> If you are testing with the example project in this repo, you can run `npm install` to install all the necessary dependencies including this one.

Once the package is installed we can now start the setup process.

For this process there are several steps we need to take:
1. Import the Provider
2. Set up the user context with Client Key
3. Wrap the application with the Provider 

### Import the Provider
To import the provider we will need to add the following line to the top of our `index.tsx` file:
```tsx
import { asyncWithLDProvider, LDContext } from 'launchdarkly-react-client-sdk';
```
> NOTE: since we will be creating the context object for the provider I have added the `LDContext` import as well. This is not necessary if you are not using typescript.

This is what we should have so far: 
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importing the Launch Darkly provider to wrap our app for access to feature flags
import { asyncWithLDProvider, LDContext } from "launchdarkly-react-client-sdk";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

reportWebVitals();
```

### Set up the user context with Client Key
Now that we have our provider we will need to set up a user context and connect the proper client key to the provider. 

When you set up the context object you will need to provide the following information:
- `clientSideID`: This is the SDK key for the project and environment you are connecting to.
- `context`: This is the user context object that will be used to track the user and will be checked against feature flags for access. This can contain any custom attributes you would like to track.

In the `index.tsx` file we will need to add the following code to set up the user context and connect the client key to the provider.

```tsx
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
  },
};
```
> NOTE: You will need to replace `YourClientSideID` with the key for the project and environment you are connecting to.

### Wrap the application with the Provider

Now that we have our context object set up we can now wrap our application with the provider and connect to Launch Darkly. 

To do this we will need to add the following code to the `index.tsx` file:

```tsx
// We are wrapping in an async iffy to use async/await
(async ()=> {
  // instance the provider with the context
  // because we are using async/await we need to await the provider
  const  LDProvider =  await asyncWithLDProvider(context);

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      // Wrap application with provider so feature flags are available
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>
  );

  reportWebVitals();
})();
```

This is what our `index.tsx` file should look like now:
```tsx
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
      // Wrap application with provider so feature flags are available
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>
  );

  reportWebVitals();
})();
```
You should now see the following in your chrome console:
![Chrome Console](./assets/setup_react_sdk/console_output_init.png)

At this point we have set up the Launch Darkly SDK in our React project and connected it to the project and environment we set up in the Launch Darkly console. 🎉 

![celebrate](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3J5Z2hzNGE3eDk4N3pqMnk1bjR5MWFvcmgyMXB1YTI5NHk5czdueCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Dg4TxjYikCpiGd7tYs/giphy.gif)

## Create a 🚩 feature flag in Launch Darkly Console


## Implement 🛠 feature flag in React