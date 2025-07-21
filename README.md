🧑‍💻 Tech Stack
Frontend
React ^19.1.0
React Router DOM ^7.7.0
MUI ^7.2.0
Axios
Toastify

Backend
Express ^5.1.0
Mongoose ^8.16.4
JWT ^9.0.2
dotenv
bcryptjs
nodemon

JWT_SECRET="uihuidhufhdufhuihfui"

Add your own db url in backend>config>
.connect('mongodb://localhost:27017/"yourdb"')

API Endpoints
🧍‍♂️ User Authentication
| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| POST   | `/signUp` | Register a user    |
| POST   | `/login`  | Login and get JWT  |
| POST   | `/logout` | Clear token cookie |

📹 Video Management
| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| POST   | `/video`               | Upload new video (auth required)  |
| GET    | `/allVideo`            | Get all videos                    |
| GET    | `/getVideoById/:id`    | Get video by ID                   |
| GET    | `/:userId/channel`     | Get all videos by a specific user |
| GET    | `/allVideo?type=Anime` | Filter videos by category (Anime) |

💬 Comments
| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | `/comment`          | Add comment (auth required)  |
| GET    | `/comment/:videoId` | Get all comments for a video |

⚙️ NPM Commands
Backend
npm install        # install backend deps
npm run dev        # run backend with nodemon

Frontend (inside client/)
npm install        # install frontend deps
npm start          # run React app

GitHub & Git Commands
git init
git remote add origin <your-github-repo-url>
git add .
git commit -m "Initial commit"
git push -u origin main

https://github.com/BhaktidB/youtube-clone
