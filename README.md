# UserCompare - A Github Analytics
This is the first project for the course TWEB 2018 at the HEIG-VD.

**Authors :** Nanchen Lionel and Nicole soit Nicoulaz Olivier

##UserCompare:

UserComapre is a GitHub analytics website. With this application you can compare differents GitHub users with a simple interface.

The informations available are:

- Number of commits
- Number of added lines (++)
- Number of subtracted lines (--)
- Ration between added and subtracted lines
- Number of followers
- Number of following

The GitHub users available are:

- LionelNanchen
- onicoleheig
- wasadigi
- paulnta
- edri
- mraheigvd
- kamkill01011
- onicole

##General:

This project is separated in two parts: the client and the server.

The client represent the frontend. It manages all interaction with the users.

The server represent the backend. It communicate with the GitHub REST API to recover all needed datas and make those available for the client in JSON format.

## How to use it ?

To compare github users you have to click on the plus icon of the users that you want to compare to add them in the list at the right of the screen (on the top of the screen with mobile). When you have selected some users click on "Compare users" to show the datas.

## How to install it locally ?

1. **The first step is to clone this repo** 

``` $ git clone https://github.com/LionelNanchen/TWEB_UserCompare.git```

2. **Add the token**

Copy the ```.env.default``` file and rename it to ```.env``` and edit the token with your OAUTH_TOKEN. You can find more informations there https://github.com/settings/tokens

3. **Install dependancies**

```$ npm install```

4. **Start MangoDB**

``` $ mongod```

5. **Run the app.js**

```$ npm start```

## Client

We used two bootstrap template to create the frontend part.

For the general look of the page: https://startbootstrap.com/template-overviews/shop-homepage/

For the rounded users avatar: https://startbootstrap.com/template-overviews/round-about/

## Some helpfull links that we used

MangoDB / mongoose

https://docs.mongodb.com/guides/server/install/

https://mongoosejs.com/

https://mongoosejs.com/docs/index.html



Backend

https://github.com/heig-vd-tweb/express-server-skeleton



Frontend

https://github.com/heig-vd-tweb/github-analytics-light