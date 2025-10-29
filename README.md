Airline Project Management - API Gateway
This API Gateway serves as the central entry point for the Airline Project Management backend system, efficiently routing requests to four specialized microservices:

Authentication Service ->  https://github.com/sarveshwar4/authService

Flight Search Service -> https://github.com/sarveshwar4/flightAndSearchs 

Booking Service -> https://github.com/sarveshwar4/BookingServices

Reminder Service ->https://github.com/sarveshwar4/ReminderService

Features
Unified Entry Point: All external requests come through this gateway, simplifying access and making the architecture scalable.

Rate Limiting: Prevents abuse by blocking excessive requests from the same IP (5 requests per 2 minutes window).

Request Logging: Uses Morgan middleware for comprehensive request logs.

Authentication: Applies a custom middleware for user verification before accessing sensitive endpoints like booking.

Flexible Service Routing: Proxies requests to the correct microservice using http-proxy-middleware.

Service Overview
Service	Endpoint	Proxy Target	Description
Auth Service	/AuthService	localhost:3001	Manages user authentication
Flight Service	/flightService	localhost:3000	Handles flight listing/search
Booking Service	/bookingService	localhost:3002	Processes bookings (auth required)
Reminder Service	(Add as needed)	(Define target)	Sends reminders to users
Security
Rate Limiting: Prevents brute-force and denial-of-service attacks by limiting each IP’s request frequency.

Authentication Check: The booking service route requires users to pass AuthorisedUser middleware before requests are proxied.

Getting Started
Clone the repository

Install dependencies

bash
npm install
Start gateway

Run all microservices locally at their respective ports
(services must match specified targets in gateway logic)

Example Usage
Book a flight:
Send an authenticated request to /bookingService (proxied to booking microservice).

Search flights:
Make GET requests to /flightService.

Technologies Used
Express for building server and endpoints

Morgan for logging HTTP requests

express-rate-limit for rate limiting

http-proxy-middleware for microservice routing

Notes
Make sure your .env is not committed

Add necessary service URLs to your config and update APIs as you extend features (i.e., add Reminder Service).

