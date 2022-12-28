# Planets Server (Project 2)
> Custom backend server for https://github.com/jasonlerit/project-2-planets

## 💻 Tech Stack
> - TypeScript
> - Express
> - MongoDB

## 🚀 API Endpoints

### Planets
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| GET    | planets                   | controllers/planet_controller@getPlanets                             |
| GET    | planets/id                | controllers/planet_controller@getPlanet                              |

### News
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| GET    | news                      | controllers/news_controller@getNews                                  |

### Feedback
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| POST   | feedback                  | controllers/feedback_controller@sendFeedback                         |

### Verification
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| POST   | verify/account            | controllers/verification_controller@verifyAccount                    |
| POST   | verify/password           | controllers/verification_controller@verifyPassword                   |

### Auth
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| POST   | quiz/auth/register        | controllers/quiz/auth/register_controller@register                   |
| POST   | quiz/auth/login           | controllers/quiz/auth/login_controller@login                         |
| POST   | quiz/auth/google          | controllers/quiz/auth/login_with_google_controller@loginWithGoogle   |
| POST   | quiz/auth/forgot-password | controllers/quiz/auth/forgot_password_controller@forgotPassword      |

### Leaderboard
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| GET    | quiz/leaderboards         | controllers/quiz/leaderboard_controller@getLeadeboards               |

### Dashboard
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| GET    | user/dashboard            | controllers/user/dashboard_controller@getDashboardStats              |

### Quiz Game
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| GET    | user/quiz                 | controllers/user/quiz_controller@getQuiz                             |
| POST   | user/quiz                 | controllers/user/quiz_controller@startQuiz                           |
| POST   | user/quiz/submit          | controllers/user/quiz_controller@submitAnswer                        |

### Settings
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| POST   | user/settings/password    | controllers/user/settings_controller@updatePassword                  |

### Profile
| METHOD | URI                       | ACTION                                                               |
|--------|---------------------------|----------------------------------------------------------------------|
| GET    | user/profile              | controllers/user/profile_controller@getProfile                       |
| POST   | user/profile              | controllers/user/profile_controller@updateProfile                    |