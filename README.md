# E2S System

  

## Table of Contents

- [Description](#description)

- [Key Features](#key-features)

- [Architecture](#architecture)

- [Benefits](#benefits)

- [Tech Stack](#tech-stack)

- [Getting Started](#getting-started)

- [Clone Repository](#clone-repository)

- [Installation](#installation)
  

### Description

  
E2S (Energy Efficiency Software) is a cutting-edge Software as a Service (SaaS) web application that aims to revolutionize energy management for businesses and organizations. It centralizes energy data from various sources and provides insightful data visualization tools to help users understand and optimize their energy usage effectively. E2S is designed to empower customers with valuable insights, enabling them to identify energy-saving opportunities, reduce energy costs, and minimize their carbon footprint.


### Key Features
- Centralized Energy Data: E2S gathers and consolidates energy data streams from different sources, providing users with a unified view of their energy consumption and performance.

- Data Visualization: The application presents energy data in the form of interactive and intuitive energy flow diagrams, making it easier for users to analyze trends and patterns.

- Cost Forecasting: E2S offers a powerful cost forecasting feature that estimates future energy costs by analyzing historical data, supplier forecasts, and temperature-based consumption patterns.

- Weekly Email Reports: Users receive weekly email reports summarizing their energy consumption, costs, and providing valuable insights to identify potential energy-saving opportunities.


### Benefits
- Save Money: By utilizing E2S's cost forecasting and insights, businesses can make informed decisions to optimize energy usage, leading to significant cost savings on site energy expenses.

- Reduce Carbon Emissions: E2S empowers organizations to reduce their carbon footprint by identifying and implementing energy-saving strategies.

- Time Savings: Facility energy managers can streamline their energy management tasks with E2S, as it automates regular reporting and provides key information directly through weekly email reports.


### Architecture

The C4 diagram for our project covers three levels: the context, containers, and components. These levels allow us to map out the structure of our project and provide an understanding of how our files should be named and organized. At this level of detail, we have everything we need to start writing code in our preferred Integrated Development Environment (IDE).

**C4 Levels Explained**


- **Context Level**: 
This level provides an overview of our project's high-level context, including external systems or users interacting with our application. It helps us understand the system's boundaries and external dependencies.

- **Containers Level**: 
The containers level focuses on the major architectural building blocks of our application. It outlines the different subsystems or services that make up our project and the interactions between them. This level aids in defining the high-level structure of our application.

- **Components Level**: 
At this level, we break down the containers into their individual components or classes. It gives us a more detailed view of the internal structure of each container. This level helps with understanding the relationships and responsibilities of each component.


![Team 2 C4 Architecture (1)](https://github.com/Mahrukhz/E2S/assets/68380691/34929ffa-93bc-49fb-ae45-1de1f3c85b59)


### Tech Stack

  
**_Features_**
- MySQL Database: The project utilizes MySQL as the database management system to store and manage application data efficiently.

- Node.js/Express.js Backend: The backend of the application is built using Node.js and Express.js, providing a RESTful API to handle data requests and interactions with the database.

- React with TypeScript Frontend: The frontend is developed using React with TypeScript, ensuring type safety and enhanced code quality throughout the application.

  

## Getting started

To run E2S on your local machine, follow these steps:

### Clone Repository

  

Clone the repository:

```

git clone https://github.com/Mahrukhz/E2S.git

```

  

**Read the next section to learn how to install the required NPM packages**

  

### Installation

  

- To setup your machine to work on the server, consult to the `README.md` in `/api` directory.

- To setup your machine to work on the user interface, consult to the `README.md` in `/ui` directory.


## Site Accounts
All passwords on the database are hashed with bcrypt. The un-hashed user passwords are below:
- Martin James: martin12345
- Rhy Jones: rhy12345
- James Ohay: james12345
- Max Norris: max12345
- Johnny Bravo: johnny12345
- Jade Pierce: jade12345
- Martina Schmitt: martina12345
- Antonio White: antonio12345
- Cai Robert: cai12345
- Admin User: adminpass

## VS Code Prettier Extension

- Install the Prettier extension from the extensions tabs in VS code

- Go to File -> Preferences -> Settings -> Search for Formatter

- Select prettier in the setting (Default Formatter)

- And select the boxes next to Format on paste and Format on save

- Make sure javaScript format enable is selected as well
