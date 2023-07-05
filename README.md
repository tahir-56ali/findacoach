# Find A Coach App

## App Pages

- All Coaches Page; allows to filter coaches on "Frontend", "Backend" and "Career"
- Coach Detail Page; with contact coach form
- Requests Page; for showing contact requests sent to a coach
- Register as a coach Page: allows to register a logged in user as a coach
- Authentication; Login & Signup functionality
- Not Found Page; shows if invalid route is accessed in browser

## Vue Features Used

- vue-router for routing => router.js
- vuex for state management under store directory for auth, coaches and requests modules
- pages directory for components loaded through routes using router-view under App.vue
- components directory for loading sub components under pages components
- route transition applied on page load
- used Async components to optimize less used components by loading as needed
- used firebase as database to store and fetch coaches / requests
- used firebase authentication for signup and login functionality
- deployed project "build" on firebase link: https://vue-http-demo-cf0db.web.app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
