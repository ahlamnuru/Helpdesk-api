## Project Help Desk API

This project focuses on a customer issue-resolution platform. Users of any system can submit tickets or issues to service providers, and the system's agents work to resolve each issue submitted by users.

## How the System Provides the Service (How the System Works)

Our system is a help desk API that collects users' issues or feedback and delivers them to the system's agents and administrators. The agents handle the submitted issues or problems users face and provide solutions.

The system administrator monitors the actions of users and agents and their feedback to maintain a stable system and improve the user experience.

## What the System Does for Users

The system is user-friendly. Every customer can communicate with the development team and report user experience (UX) feedback or issues. The team handles them, and the user receives a solution.

## Actors and Their Purposes

### Customers

Customers are the users, or final consumers, of the system. They are the source of requests handled by the help desk API: they write issues and submit them to the agents. Users submit their issues to the system and receive a solution or feedback.

```
Action flow =>
The user logs in to the system using an existing account or creates an account for the service.
The user writes the issue title and description, and sets the issue priority to low, medium, or high.
The issue is stored as a ticket and associated with the user's ID.
The ticket is delivered to the administrators and agents. The user waits for the issue to be fixed or receives updates.
```

### Agents

Agents resolve issues and provide solutions for customers. They play a significant role in improving the user experience.

```
Action flow =>
Agents see all the issues submitted to the portal and assign tickets to themselves by opening them.
They read and evaluate the issues submitted by users.
They provide appropriate feedback to users or fix issues related to the reported issue, then open or resolve the reported tickets.
They track tickets as they are opened, resolved, or reopened. The tickets are associated with the agent's ID or other information to support tracking, auditing, and system data management.
```

### Admin

The administrator is the system's supervisor and manager. They track all actions within the system.

This includes viewing users' tickets and agents' actions. If something goes wrong, administrators handle it, and they can delete tickets or change their status.

```
Action flow =>
View all tickets submitted by customers and assign an agent to each ticket.
Track ticket statuses and delete tickets if they should be removed.
Manage and review each agent's response to tickets and how they handle them.
Change ticket statuses depending on their situation.
Create public (for everyone) and internal (for staff members) comments to communicate with others.
Change users' roles and view every user's actions.
```

### Main System Workflow

```
A customer registers and logs in to the system.
The customer creates a support ticket that describes the problem they are facing.
The agent investigates the problem and communicates through comments.
The agent updates the ticket status as the problem progresses.
The customer can confirm the solution and close the ticket.
The administrator manages user permissions and the overall system.
```

Now that we understand how the system works and the actors and their purposes, we can identify the system requirements and features.

### Main Requirements and Features

```
User registration and authentication: Users should be able to register and log in securely.
Role-based access and permissions: Each actor should have a specific role with different permissions depending on their responsibilities.
Ticket creation and management: Customers should be able to create and manage their tickets while an agent is working on them.
Ticket assignment and status management: Agents should be able to take available tickets, and administrators should be able to assign tickets to agents.
Customer and agent communication through comments: Agents and administrators can communicate through ticket comments.
User management by administrators: Administrators should be able to manage user accounts, roles, and account statuses.
```

### Development Action Workflow

```
helpdesk-api/
  src/
    app.js  server.js  migrate.js            (from the scaffold)
    config/       env.js  db.js  passport.js
    migrations/ users tickets comments
    routes/       index.js  auth.js  tickets.js  comments.js  admin.js
    controllers/  authController.js  ticketsController.js  ...
    services/     authService.js  ticketService.js  (all SQL lives here)
    validators/   authValidators.js  ticketValidators.js  commonValidators.js
    middlewares/  auth.js  validate.js  errorHandler.js
    utils/        token.js  httpError.js  hashpassword.js ...and other helper functions
```

#### System Workflow

```
Build database storage for users, tickets, and comments using node-pg-migration schemas and their dependencies.

1. Accept the registration form, sanitize the user's inputs, and validate them using express-validator.
2. Validate and sanitize the inputs.
3. The auth controller checks that the email is unique, registers the user, and stores the user as ready to log in.
4. Store the user's data using the user model.
5. The user model communicates with the database and carefully stores the information.
6. Tell the user to log in using their email and password, and redirect them to the login page.
7. The user tries to log in using their username or email and password.
8. The auth controller handles this using the user model: it finds the user in the database and retrieves the user.
9. The token utility generates a JWT for the user using the JWT secret. The token can be used when sending requests during its validity period token attached in the client.
10. The user is redirected to a protected route to send tickets to the agent.
11. Express-validator handles the title, body, and priority values, and sanitizes them before they are stored in the database.
12. The `/tickets/new` route communicates with the controller to store data using the tickets model.
13. The ticket model stores the ticket and associates it with the user's ID.
14. The user's ticket route displays only the tickets owned by that user.
15. The submitted ticket reaches the agent portal and is displayed.
16. The agent opens the ticket, resolves and fixes the customer's issue, and marks it as resolved. The controllers and models handle these actions.
17. The user receives an update about the ticket and can attach a comment to it.
18. The admin router communicates with the ticket controller and retrieves all tickets with their authors and assigned agents using the models. If an agent is assigned, include that agent; otherwise, assign an agent using the controller.
19. The `/tickets/delete/:id` route handles ticket deletion by communicating with the ticet model.
20. Cascade deletion removes all ticket-dependent data, including comments and other related items, using the ticket model.
21. Delete users and mke users inactive using conriler and user models also cascade terminations
```
