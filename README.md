# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```


### Learning Notes about REMIX

- The difference between Remix and other SSR framework is that Remix allows nested routing within the same page. You just need to create a directory with the name like $id and you put sub routes inside this directory and you need to use the <Outlet> component. Take a look to `$filmId.tsx` and `@filmId` directory in /app/routes/films

- You can define error boundaries inside your Remix components. Take a look to `app/routes/films/$filmId/characters.$characterId.tsx` to see an example

- In this example we are using `json-server` to make/simulate POST requests and we are using online `https://ghibliapi.herokuapp.com/films` api to get test data

- We are using tailwind css for style
