# PETFAMILY

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

The application is deployed to VPS of AWS and can be accessed through the following link:

 - Petfamily social pages :([https://petfamily.click](https://petfamily.click))
 - Petfamily Dashboard Admin :([https://admin.petfamily.click](https://admin.petfamily.click))
 - Petfamily api :([https://api.petfamily.click](https://api.petfamily.click))

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
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/2baac466-cf44-403a-a878-1ce170976301)



- Login and Register page:
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/0ab0a5a3-0cd3-48f8-a029-7c8012c5259c)



- Suggesting mutual friends based on who you followed, showing the list of mutual friends
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/10beeac9-0aac-4e51-8cba-00bb60fa02a1)



- Create post with status, image, emoji-icon:
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/0007e089-f97e-4323-85b8-b2bde3016bae)



- Like and comment post:
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/0d5abb61-6338-4c2d-9282-a8376ce465cc)

- Share post:
  
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/8896f816-03f1-4f21-80b7-e4744b9d4f7f)


- Announce related activities:

 
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/53d6fece-e698-45a0-b9d9-0c11077f999d)


- ChatBox realtime using Socket.io:
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/43289966-3a4a-45ce-b699-dd28092f96e0)


- My Profile:
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/cde3bc3a-a881-434f-a2d7-eae7091060f3)

- Profile pet: 
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/b03136ed-1ba8-4787-8486-ba4f1695743a)
Use mapbox to support users to post articles displayed on pages of nearby users within 5km.
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/faaf662e-e08c-42d2-a18d-291cf9472884)

- ADMIN
Admin Managerment dashboard: Statistics of the number of posts over time
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/79f84c5c-6308-447c-a339-85a3320b640f)

- User, post Managerment
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/8279d43c-7fc0-4e13-b2c3-b4d71277849d)

- Processing reports of posts submitted by users
![image](https://github.com/CongChuong1909/petFamily/assets/92925332/fa83b374-d843-4f99-87d3-ad8277894696)


# THANKS FOR WATCH
