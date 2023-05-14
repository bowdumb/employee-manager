# Command Line Employee Manager

## Description

The Command Line Employee Manager is a simple, lightweight application that allows small business owners the ability to organize, restructure, and ultimately plan ahead for their business and it's employees. As the name implies, this application runs from within the command line interface, displaying visual representations of the user's database and the roles, departments, and employees that make up their company. The user is able to view all of these statistics, as well as dynamically modify their content all from within their terminal.

## Installation

Installation is straightforward. If obtaining this application through GitHub, simply clone the following repository to your local machine: https://github.com/claxCode/employee-manager. Once the necessary files have ben imported to your machine, navigate in your terminal to the root directory containing the repository, and run `npm i` to install the necessary NPM package dependencies as listed within the package.json file. These dependencies include: Node.js, Inquirer.js, and MySQL2. Once the necessary NPM dependencies have been integrated, simply initiate the application by running `node index.js` from within your terminal.

## Usage

Once the necessary NPM dependencies have been downloaded and successfully integrated, simply initiate the application by running `node index.js` from within your terminal. This will execute the JavaScript logic which will include the initialization of our Inquirer.js question prompts. The user will now have a command line menu through which they can view and modify their companies departments, roles and associated salaries, managers assigned to individual employees, and a list of the employees themselves. If at any point the user finds that they would like to abort a change that they have selected, simply force-quit the application by typing `cntrl+C` on their keyboard. If they would like to quit the application from within the main menu, simply select the `Exit` option and press `return`.

## Features

The driving force behind this application's front-end is the Inquirer.js NPM package. It is through the Inquirer.js package that all of the visual components of our menu and database tables are made possible. The Inquirer.js package is framed within JavaScript, which allows us to employ logic that allows the user to ultimately alter the database using the MySQL2 NPM package to run the back-end functionality. All of this takes place within the Node.js JavaScript runtime-environment which enables us to execute JavaScript code from outside of a browser's web API.

## Screenshots

![Screenshot demonstrating the main menu](/screenshots/Screenshot%202023-05-14%20at%203.24.53%20PM.png)

![Screenshot demonstrating the visual representation of database tables](/screenshots/Screenshot%202023-05-14%20at%203.25.18%20PM.png)

## Contact

For questions regarding this project, please feel free to contact me on LinkedIn at: <a href="https://www.linkedin.com/in/joshua-claxton-916a2a272/">this link</a>

## Video Demonstration

<a href="https://drive.google.com/file/d/1sI4uNnqU59Pt8RSKvVSJ_EPwrT9-jZiy/view">Click here to view a video demonstration of this application's functionality.</a>