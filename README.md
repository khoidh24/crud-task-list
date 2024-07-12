# Back-End - CRUD Task with start and end dates

## Back-end

Create RESTful API for a to-do list application using **Express.js** and **TypeScript**.

## Requirements

- A task had three fields: name, start date, and end date.
- Task name must be non-empty, with the maximum length of 80 characters
- Start date (optional)
- End date (optional), but start date must be present if there is an end date
- Start date and end date are formatted in YYYY-MM-DD

## API

- Design RESTful endpoints
- Validate the requests
- Handle asynchronous errors

## Database

- Design and implement the database using TypeORM with sqlite3 in-
  memory option
- Use `synchronize: true` when defining the data source
- No migrations are needed

## Testing

- Use `supertest` to write end-to-end tests for all endpoints
- Cover all possible scenarios

## Other requirements

- Use TypeScript for type safety.

1. Define types where applicable.
2. Do not use any type.
