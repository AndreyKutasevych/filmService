🎬 filmService

filmService is a web-based application designed to manage and display a collection of films. It allows users to view, add, edit, and delete film entries, providing a seamless interface for film enthusiasts and administrators alike.

🚀 Features

    Film Listing: Browse through a list of available films with details.

    Add New Films: Input new film information to expand the collection.

    Edit Films: Modify existing film details as needed.

    Delete Films: Remove films from the collection.

    Responsive Design: Accessible on various devices and screen sizes.

🛠️ Installation

To set up the project locally:

    Clone the repository:

git clone https://github.com/AndreyKutasevych/filmService.git

Navigate to the project directory:

cd filmService

Install dependencies:

npm install

Start the development server:

    npm start

The application should now be running at http://localhost:3000.
📖 Usage

Once the application is running:

    View Films: Navigate to the homepage to see the list of films.

    Add Film: Click on the "Add Film" button and fill out the form.

    Edit Film: Click on the "Edit" button next to a film entry to modify its details.

    Delete Film: Click on the "Delete" button to remove a film from the list.

Ensure that any backend services or APIs required are also running to enable full functionality.
📡 API Endpoints

The application interacts with the following API endpoints:

    GET /api/films: Retrieve a list of all films.

    POST /api/films: Add a new film.

    PUT /api/films/:id: Update an existing film.

    DELETE /api/films/:id: Delete a film.

Note: Replace /api/films with the actual API base URL if different.
🧰 Technologies Used

    Frontend:

        React.js

        React Router

        Axios

    Backend:

        Node.js

        Express.js

        MongoDB (via Mongoose)

    Styling:

        CSS Modules / Styled Components
