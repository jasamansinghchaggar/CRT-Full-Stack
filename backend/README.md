# Folder Structure for backend

The basic folder namings:
    - configs
    - models
    - routes
    - middlewares
    - controllers
    - services (optional for small projects)

# Packages used

1. express: routing, server creation, middleware
2. mongoose: connect to db, schema creation, data manipulation
3. dotenv: configuring .env
4. cors: handling cors
5. jsonwebtoken: authrization and authentication (token generation and verification)
6. bcryptjs: string hashing
7. nodemon: running dev server (or add --watch in start script)


task -> name, desc, assigned (refer to user schema), status (enum => pending, in-progress, complete)

admin: all operations
manager & team_lead: assign_task
employee: view & change its task's status

1. change role
2. reporting

heirarchy:
    - superadmin -> admin -> manager -> team_lead -> emlpoyee