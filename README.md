
# Meteor E-commerce

For Meteor E-commerce, I implemented a full-stack solution using a range of modern technologies. The application uses React for the front-end, allowing for dynamic user interfaces, while Sass provides modular and efficient styling. Zustand handles state management across components, ensuring responsive and smooth UI interactions.

On the server side, Express.js with Mongoose and MongoDB is used to manage database operations and API endpoints. Jsonwebtoken secures the authentication flow, and Bcrypt hashes passwords for user security. For secure payments, Stripe is integrated, ensuring reliable transaction handling. Axios facilitates communication between the front and back ends, streamlining data requests and responses.

Finally, Cloudinary is used for efficient image storage and management, making the e-commerce experience visually engaging while maintaining performance.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

PORT = port_number

MONGO_URI= mongo uri string

JWT_SECRET= jwtsecret

NODE_ENV = development

CLOUDINARY_CLOUD_NAME = cloudname

CLOUDINARY_API_KEY =  key

CLOUDINARY_API_SECRET = CLOUDINARY_API_secret

STRIPE_SECRET_KEY = STRIPE_SECRET_KEYcdfvfvfvdfvf

CLIENT_URL = CLIENT_URL

EMAIL_USER = your_email

EMAIL_PASS= app_password_from_google


## Run Locally

Clone the project

```bash
  git clone https://github.com/basitabdullah/Meteor-Ecom-MERN.git
```

Go to the Frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```
Start the frontend server
```bash
  npm run dev
```
Go to the Root directory

```bash
  cd ..
```
Install dependencies
```bash
  npm install
```
Start the backend server
```bash
  npm run dev
```
