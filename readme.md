## Follow below procedure to run project:

- To run the project, your device must have nodejs and postgres. If not then first install them.
- After cloning the project, go to project folder.
- Open CMD in the current folder.
- Run command: **_npm ci_**
- This command will install all dependecies.
- Now open **.env** file.
- In this file you have to enter your postgrs config.
- First is **dbName**, here enter the database name, that you want to create for the project to run, like "user-message".
- Second is **dbUsername**, here enter the postgres username. Postgres must hasve asked you while installing it. Default is username is "postgres" in Postgres.
- Third is **dbPassword**, here enter the postgres password. Like username postgres must have asked you while installing it.
- Fourth is **dbHost**, here .env file already has right value "localhost" to run locally on device.
- Fifth is **dbPort**, here enter the port number on which postgres is running on your device. Postgres must have asked you while installing it. Default port is 5432, which is already written in .env file.
- Sixth is **nodePort**, here 3000 is written. On which your node application will run.
- After that run command: **_npm run dev_**
- This command will start dev server on localhost:3000. (If you have entered the port in **nodePort** is 4000, then it will run on localhost:4000).
- To see swagger, go to **http://localhost:{nodePort}/api-docs/**
