# React Redux CRUD actions example for students

# Includes cats !

:smiley_cat:
:smile_cat:
:heart_eyes_cat:
:kissing_cat:
:smirk_cat:
:scream_cat:
:crying_cat_face:
:joy_cat:
:pouting_cat:

## How to set up (NPM commands are similar, please submit an issue if you want NPM commands included).

1. Clone repository and run the commands below (first commands for development, second commands without page reload)

```
yarn
yarn knex migrate:latest
yarn knex seed:run
mv .env_example .env
yarn dev


or

yarn
yarn knex migrate:latest
yarn knex seed:run
mv .env_example .env
yarn run webpack
yarn start
```

2. Take note of the .env file - you will need to add a secret here that will be used to encode JWT tokens. DO NOT commit this file, add it to a .gitignore. I left an example here for example purposes only.

3. Routes are protected so without login in users will see

```
// 20190216221847
// https://reduxauthcats.herokuapp.com/api/v1/cats

{
  "message": "Access to this resource was denied.",
  "error": "No authorization token was found"
}
```

## Is this deployed?

Yes, please check out https://reduxauthcats.herokuapp.com/ (Note: may take 20 seconds to load as it's on a free server)

## Can I improve this code

Certainly! I quickly created this without making it perfect. The idea was to include some mistakes or less efficient methods to encourage students to submit pull requests.

I haven't styled anything so please help me with that too :) Not only will this give you activity on GitHub but it was also improve this exercise for future cohorts.

## Questions / ideas?

Submit and issue to this repository and I'll check it out
