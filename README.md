# Twitter Scraper

The **Twitter Scraper** is a containerized full-stack application built using **Node.js**, **React.js**, and **Context API**. It is designed to efficiently scrape Twitter for specific information and display it in real-time using **Socket.IO** for faster retrieval and updates. The entire project is **Dockerized** for easy deployment and scalability across multiple environments.

---

## Features

- **Scrape Twitter Data**: Efficiently scrape data from Twitter based on predefined criteria (hashtags, users, keywords, etc.).
- **Real-time Data Updates**: Real-time display of Twitter scraping results using **Socket.IO** for live updates without refreshing the page.
- **React & Context API**: The frontend is built using **React.js** and leverages **Context API** to manage global state across the application.
- **Node.js Backend**: The backend is powered by **Node.js**, which handles the scraping logic and communicates with the frontend using websockets.
- **Dockerized**: The entire system is containerized using **Docker**, allowing for seamless deployment across different platforms.
- **Scalable**: Designed for scalability and fast retrieval, making it easy to handle large amounts of data.

---

## Tech Stack

### Frontend
- **React.js**: Used for building the UI and client-side logic.
- **Context API**: For global state management across the application.
- **Socket.IO**: For real-time communication and data updates.

### Backend
- **Node.js**: Used to handle server-side scraping and Socket.IO for real-time communication.
- **Cheerio** **Puppeteer**: For scraping Twitter data.

### Docker
- **Docker**: The project is fully Dockerized to ensure compatibility and easy deployment.
- **Docker Compose**: Used to manage multi-container Docker applications (frontend, backend, etc.).

---

## Getting Started

Follow these steps to get the project up and running locally.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14.x or above)
- [Docker](https://www.docker.com/) (Docker Engine and Docker Compose)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
