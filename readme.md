# Contest API

This API provides users with the ability to fetch competitive programming contest ratings across multiple platforms, including Codeforces, Codechef, Leetcode, and GFG. It supports fetching ratings for individual platforms or all platforms at once via RESTful endpoints.

## Features

- Fetch ratings for multiple platforms at once.
- Fetch ratings for individual platforms.
- Error handling for invalid platforms and issues during data fetching.
- Middleware to validate the username parameter.

## Supported Platforms

- **Codeforces**
- **Codechef**
- **Leetcode**
- **GFG**

## Endpoints

### 1. `GET /ratings`

Fetches ratings from all supported platforms (Codeforces, Codechef, Leetcode, GFG) for a given username.

#### Request Example:

```http
GET /ratings?username=your_username
```

#### Response Example:

```json
{
  "username": "your_username",
  "codeforces": 1600,
  "codechef": 1500,
  "leetcode": 1300,
  "gfg": 1200
}
```

#### Error Response:

```json
{
  "error": "Error fetching ratings"
}
```

### 2. `GET /ratings/:platform`

Fetches the rating for a specific platform for a given username.

#### Request Example:

```http
GET /ratings/codeforces?username=your_username
```

#### Response Example:

```json
{
  "platform": "codeforces",
  "username": "your_username",
  "rating": 1600
}
```

#### Error Response:

If the platform is invalid:

```json
{
  "error": "Invalid platform"
}
```

If there’s an issue fetching the rating:

```json
{
  "error": "Error fetching codeforces rating"
}
```

## Future Tasks

### 1. **Add More Platforms**

- Plan to add support for additional competitive programming platforms such as HackerRank, TopCoder, or others.

### 2. **Rate Calculation Enhancements**

- Implement advanced rating calculation algorithms to provide a more accurate rating system across platforms.

### 3. **User Profiles**

- Support for fetching user profiles along with their ratings, including number of problems solved, rank, and contest history.

### 4. **Cache and Performance Optimization**

- Implement caching mechanisms to reduce the number of API requests to external services and improve response times.

### 5. **Authentication**

- Add user authentication for more personalized features and account management.

## Requirements

- Node.js (v14 or later)
- Express.js
- External services for fetching ratings:
  - Codeforces
  - Codechef
  - Leetcode
  - GFG

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/contest-rating-api.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The API will be running on `http://localhost:3000`.

## Contributing

We welcome contributions to improve this project! To contribute:

1. Fork the repository.
2. Clone your forked repository:

```bash
git clone https://github.com/your-username/contest-rating-api.git
```

3. Create a new branch for your changes:

```bash
git checkout -b feature-name
```

4. Make your changes, and commit them:

```bash
git commit -am "Add feature or fix"
```

5. Push the changes to your fork:

```bash
git push origin feature-name
```

6. Open a pull request (PR) with a clear description of your changes.

### Code of Conduct

- Be respectful and constructive in your contributions.
- Please follow the existing code style and best practices used in this project.
- If you find a bug or have suggestions for improvements, feel free to open an issue.

## License

This project is licensed under the MIT License.
