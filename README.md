# HOW TO: Launch Darkly 
In this breakdown we will be going over how to set up and leverage a Launch Darkly project for feature flagging.
> NOTE: This repo contains the finalized for this setup.

## Prerequisites
- [ ] Launch Darkly Account
- [ ] React Project OR you can leverage the existing project in this repo under `react-example` 
- [ ] All necessary dependencies for a React project (IE. Node and etc)

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



## Create a 🚩 feature flag in Launch Darkly Console
## Implement 🛠 feature flag in React