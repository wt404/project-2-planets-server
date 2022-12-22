# Planets Server (Project 2)
> Custom backend server for https://github.com/jasonlerit/project-2-planets

## 💻 Tech Stack
> - TypeScript
> - Express
> - MongoDB

## 🚀 API Endpoints

### Auth
| METHOD | URI                  | ACTION                                                          |
|--------|----------------------|-----------------------------------------------------------------|
| POST   | auth/register        | controllers/auth/register_controller@register                   |
| POST   | auth/login           | controllers/auth/login_controller@login                         |
| POST   | auth/google          | controllers/auth/login_with_google_controller@loginWithGoogle   |
| POST   | auth/reset-password  | controllers/auth/reset_password_controller@resetPassword        |

### Verification
| METHOD | URI                  | ACTION                                                          |
|--------|----------------------|-----------------------------------------------------------------|
| POST   | verify/account       | controllers/verification_controller@verifyAccount               |

### Planets
| METHOD | URI                  | ACTION                                                          |
|--------|----------------------|-----------------------------------------------------------------|
| GET    | planets              | controllers/planet_controller@getPlanets                        |
| GET    | planets/id           | controllers/planet_controller@getPlanet                         |

### News
| METHOD | URI                  | ACTION                                                          |
|--------|----------------------|-----------------------------------------------------------------|
| GET    | news                 | controllers/news_controller@getNews                             |

### Feedback
| METHOD | URI                  | ACTION                                                          |
|--------|----------------------|-----------------------------------------------------------------|
| POST   | feedback             | controllers/feedback_controller@sendFeedback                    |
