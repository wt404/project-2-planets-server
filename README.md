# Planets Server (Project 2)
> Custom backend server for https://github.com/jasonlerit/project-2-planets

## 💻 Tech Stack
> - TypeScript
> - Express
> - MongoDB

## 🚀 API Endpoints

| METHOD | URI        | ACTION                                       |
|--------|------------|----------------------------------------------|
| GET    | planets    | controllers/planet_controller@getPlanets     |
| GET    | planets/id | controllers/planet_controller@getPlanet      |
| POST   | feedback   | controllers/feedback_controller@sendFeedback |
