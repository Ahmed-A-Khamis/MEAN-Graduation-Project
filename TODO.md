Full-Stack Product Management App

    Back-End (Node.js, Express, MongoDB) {c} {cm:2025-01-13T15:00:31}
        Setting Up the Project {cm:2025-01-12T16:45:25} {c}
            Initialize a Node.js project with `npm init -y` +backend #setup {cm:2025-01-12T16:43:31}
            Install dependencies: `express`, `mongoose`, `dotenv`, `bcryptjs`, `jsonwebtoken`, `joi`, `multer`, `cloudinary` +backend #setup {cm:2025-01-12T16:45:13}
            Create a `.env` file to store sensitive data (e.g., JWT secret, MongoDB URI, Cloudinary credentials) +backend #setup {cm:2025-01-12T16:45:23}

        MongoDB Setup {cm:2025-01-12T18:55:59} {c}
            Set up MongoDB Atlas and retrieve the connection URI +backend #mongodb {cm:2025-01-12T18:35:09}
            Use Mongoose to connect to MongoDB +backend #mongodb {cm:2025-01-12T18:44:00}
            Create a `Product` model with fields (`name`, `description`, `price`, `imageUrl`) +backend #mongodb {cm:2025-01-12T18:49:06}

        Authentication and Authorization {c} {cm:2025-01-12T21:24:49}
            Create an **Auth Controller** with registration and login routes +backend #auth {cm:2025-01-12T21:24:43} {c}
                Add **POST `/api/auth/register`** for user registration using bcryptjs +backend #auth {cm:2025-01-12T20:50:10}
                Add **POST `/api/auth/login`** for user login and JWT issuance +backend #auth {cm:2025-01-12T21:07:29}
            Protect routes using JWT-based authentication +backend #auth {cm:2025-01-12T21:24:38}

        Product CRUD Operations {cm:2025-01-13T14:59:46} {c}
            Create a **Product Controller** for CRUD operations +backend #products {cm:2025-01-12T21:27:40}
                Add **GET `/api/products`** to retrieve all products +backend #products {cm:2025-01-12T21:49:18}
                Add **DELETE `/api/products/:name`** to delete a product +backend #products {cm:2025-01-12T22:23:21}
                Add **POST `/api/products`** to create a product +backend #products {cm:2025-01-13T11:40:32}
                Add **PUT `/api/products/:name`** to update a product +backend #products {cm:2025-01-13T14:58:31}
            Implement validation using **Joi** for product data +backend #validation {cm:2025-01-12T22:29:54}

        File Uploads (Product Images) {cm:2025-01-13T15:00:12} {c}
            Configure **Multer** for file uploads +backend #fileuploads {cm:2025-01-13T15:00:00}
            Set up **Cloudinary** for image storage +backend #fileuploads {cm:2025-01-13T15:00:02}
            Update the `Product` model to include an `imageUrl` field +backend #fileuploads {cm:2025-01-13T15:00:09}

        Error Handling {cm:2025-01-13T15:00:24} {c}
            Create a global error-handling middleware to standardize error responses +backend #errorhandling {cm:2025-01-13T15:00:21}

    Front-End (Angular)
        Set Up Angular Project {cm:2025-01-13T15:20:17} {c}
            Initialize a new Angular project using Angular CLI +frontend #setup {cm:2025-01-13T15:20:14}

        Create Components {c} {cm:2025-01-19T21:30:38}
            **Product List Component (`ProductListComponent`)** : {cm:2025-01-14T13:58:11} {c}
                Display a list of products with `name`, `description`, `price`, and `image` +frontend #components {cm:2025-01-14T13:57:59}
            **Product Form Component (`ProductFormComponent`)** : {cm:2025-01-16T20:49:24} {c}
                Create a form for adding/editing products +frontend #components {cm:2025-01-16T20:49:26}
                Add fields: `name`, `description`, `price` +frontend #components {cm:2025-01-16T20:49:28}
            **Login Component (`LoginComponent`)** : {cm:2025-01-18T14:54:52} {c}
                Create a login form for `email` and `password` +frontend #auth {cm:2025-01-18T14:54:43}
                Handle login with `AuthService` +frontend #auth {cm:2025-01-18T14:54:49}
            **Register Component (`RegisterComponent`)** : {cm:2025-01-19T21:30:15} {c}
                Create a registration form +frontend #auth {cm:2025-01-19T21:30:19}
                Handle registration with `AuthService` +frontend #auth {cm:2025-01-19T21:30:34}

        Routing {cm:2025-01-19T21:30:41} {c}
            Set up routes: `/login`, `/register`, `/products`, `/products/add`, `/products/edit/:id` +frontend #routing {cm:2025-01-19T21:30:40}

        Services {cm:2025-01-19T21:30:56} {c}
            AuthService {c} {cm:2025-01-19T21:30:48}
                Handle login and registration requests +frontend #services {cm:2025-01-19T21:30:44}
                Store JWT token in localStorage +frontend #services {cm:2025-01-18T16:56:38}
            ProductService {cm:2025-01-19T21:30:52} {c}
                Handle product CRUD operations with `HttpClient` +frontend #services {cm:2025-01-19T21:30:52}

        Forms {cm:2025-01-18T16:56:56} {c}
            Implement product forms using Angular Reactive Forms or Template-Driven Forms +frontend #forms {cm:2025-01-18T16:56:57}
            Add validation for required fields +frontend #forms {cm:2025-01-18T16:56:58}

        Route Guards
            Create a **Route Guard** to protect authenticated routes +frontend #auth
            Redirect unauthenticated users to the login page +frontend #auth

        HTTPClient
            Use `HttpClient` for API requests +frontend #http {cm:2025-01-18T16:57:18}
            Handle loading states and errors +frontend #http

        Pipes
            Create a custom pipe for price formatting (e.g., currency display) +frontend #pipes
            Use built-in pipes (e.g., `date`, `uppercase`) as needed +frontend #pipes

    Extra Features (Optional) {c}
        **Pagination**: Add pagination for product listings +features #pagination
        **Search Functionality**: Implement a search bar to filter products +features #search
        **Product Details Page**: Display detailed product information +features #details
        **Error Messages**: Display meaningful error messages for failed operations +features #errorhandling
        **Image Preview**: Add image preview functionality before form submission +features #ui
