# Task Collection Back-End

Back-end of a checklist application that enables user's to create, manage and search your tasks.
All users and tasks are stored in a No-SQL database.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This is a Node.js project. Before installing the project, download and install the following prerequisites.

* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

### Installing

```
# clone the repository locally
git clone https://github.com/jessham/task-collection-back.git
# change the directory
cd task-collection-back
```

### Configure .env file

Create a ```.env``` file in the root directory of your project.
You will need to update these credentials:
```
#CLOUDANT
CLOUDANT_USERNAME=
CLOUDANT_PASSWORD=
CLOUDANT_HOST=
CLOUDANT_URL=

#DATABASE
USER_DATABASE_NAME=
TASK_DATABASE_NAME=
```

### Run the application
```
# install any dependencies
npm install
# then start the app
npm start
```