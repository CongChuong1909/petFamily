# BOOKSHOPS

## Table of contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Run](#run)
- [Technology](#technology)
- [Features](#features)
- [DevelopmentOrientation](#DevelopmentOrientation)
- [Page](#page)


## Introduction

A social networking website for the community of pet lovers  using Node js, Express js, and MySQL, ReactJS.

NOTE: Please read the RUN section before opening an issue.

## Demo

![image](![image](https://github.com/CongChuong1909/petFamily/assets/92925332/da3312c5-0031-48a9-8aed-4201aac6860b)
)

The application is deployed to Reder.com and app.netify.com and can be accessed through the following link:

 - Petfamily social pages on netify:[ updating.../](...)
 - Petfamily Dashboard Admin on netify:[ updating.../](...)
 - Petfamily api on render:[ updating...](...)

the site can function normally as a social networking site.You can post, interact with articles, the user can create their pet profile and manage them like an electronic health book. In addition, the website has other features of doctors or clinics, features of website administrators

## Run

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

- MONGO_URI: this is the connection string of your MongoDB Atlas database.
- CLOUDINARY_NAME = your name config cloundinary
- CLOUDINARY_KEY = your key config cloundinary
- CLOUDINARY_SECRET = your secretkey cloudinary
- CLIENT_ID = mapbox client id
- CLIENT_SECRET = mapbox secret id
- CLIENT_URL = your domain homepages
- ACCESS_TOKEN_SECRET = random token jwt
- REFRESH_TOKEN_SECRET = Random refresh token

Now you can move to folder Client, Sever, Admin and run "npm install" in the terminal to install node_modules and run "npm start" for Server and "npm run dev" for Client, Admin this application should work.

## Technology

The application is built with:

- Node.js version 16.13.0
- Mysql version 2.18.1
- Express version 4.18.2
- vite version 4.3.0
- React Version 18.2.0
- React Bootstrap Version 2.7.2
- React Router Dom Version 6.4.2
- Cloudinary version: 1.36.4
- socketio version 4.6.2
- Localstorage : used for login information in the checkout page
- Fetch API: used to CRUD data interact with API
- AdminBro: used and customized to implement the admin panel
- Express Validator: used for form validation
- Mapbox: used for calculate distance
- ...

## Features

Social networking website for the pet-loving community has the following features:

- Create an account, login or logout with google, github, forgot gmail authentication password
- Users can post and manage their posts on the profile
- Interactive features with posts such as: like, comment, reply to comments, share post...
- Report offending posts to admin
- Search for user information, Post
- Follow, unfollow, block user
- Chat with other users in realtime
- Notification of activities to user posts and followers
- Create profiles, electronic health books for pets, post articles about losing pets, the article will be displayed on other users' pages within a radius of 5km
- Register as a website collaborator like a doctor/clinic. Users can rate on their personal page

Admins can do the following:

- Login or logout to the admin panel
- Admin can see the post, user, pet statistics of the website with a diagram
- View detailed information about posts, and admin users can hide or block that user from the dashboard
- Administrators can send system notifications to all users or certain users
- Handling requests to report post from users
- 
## DevelopmentOrientation
- Expand into an e-commerce website that can sell pet supplies
- Build a pet appointment booking feature for doctors/clinics
- Responsive web design.

## Page
- USER
Home Page:
![image](![image](https://github.com/CongChuong1909/petFamily/assets/92925332/3e68126e-a501-40c1-9a7f-01e053b1105a)
)

Login and Register page:
![image](![image](https://github.com/CongChuong1909/petFamily/assets/92925332/f89a77db-a719-4946-9f75-a353438fb464)
)
Cart page:
![image](https://user-images.githubusercontent.com/92925332/222942693-7c06317e-95a8-4b33-b6f6-ed12352fbf1d.png)
Payment page:
![image](https://user-images.githubusercontent.com/92925332/222942713-23aaa97f-1220-4ab0-a90b-7650f263e9a6.png)
My invoice page:
![image](https://user-images.githubusercontent.com/92925332/222942739-03f73c4f-48dd-4ed7-86ef-dace73227d0b.png)

- ADMIN
Admin Managerment:
![image](https://user-images.githubusercontent.com/92925332/222942812-6acec78b-87a9-4cdb-af82-6fd82f5bc83a.png)
Invoice Managerment
![image](https://user-images.githubusercontent.com/92925332/222942832-0005092e-6232-431e-97fa-13d4fa207683.png)


# THANKS FOR WATCH
