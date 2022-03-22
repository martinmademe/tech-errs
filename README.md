# tech-errs 
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) for a little quiz app.

## Getting Started

Install then run the development server:

```bash
npm i
npm run dev
```

..and you're good to go.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Approach
I favour a BDD ('behavioural') approach to building apps - planning the implementation from the user perspective. 

For this brief, that gave me these AC's: 

> As a user, when I come to your App I want to...
> - be able to set myself a username...
> - be able to set the difficulty of my task...
> - be able to take a quiz...
> - see my score...
> - get usefull feedback.

I like to keep things lean, but pragmatic. 

With the criteria from my AC's I can define some some high level test cases to help shape the end-end user flow:   

    Home,
    allows me to set a username...
    & allows me to set a difficulty level...
    & clicking the button re-routes me to the Quiz.
    
    Quiz,
    displays me a question...
    & clicking the button re-routes me to the Results screen.

    Results,
    displays me a score...
    & shows me some feedback...
    & clicking the button re-routes me Home.

Following a kind-of T(B)DD approach - I write some broken tests, then fix 'em. Which gives me something like this [commit](https://github.com/martinmademe/tech-errs/commit/272a9ac325ac7661f3153762a6b5fd7873b61a83) - a set of core compomnents defined with the tests.

From here, I start building out the App.

## Principals
Wherever possible I try to avoid too many packages, and opt for web Api's (eg fetch), or default react (eg. context). 

# Documentation
This is a living doc. It details how I'm building the App. Things will change as we go, but that's OK.

## Stack & Tooling
This project was [built with](https://nextjs.org/) `create-next-app`.

## Testing
We're using [Jest](https://jestjs.io/) as shipped with `create-next-app`, with [react-testing-library](https://github.com/testing-library/react-testing-library).

# Framework
We're all about [create-next-app](https://nextjs.org/) with [hooks](https://reactjs.org/docs/hooks-intro.html).

## Syntax
Typescript with some plain old JS.

## Routing
Keeping it simple, `create-next-app` comes with [routing](https://nextjs.org/docs/routing/introduction) out of the box.

## API Requests
Out the box [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to query [opentdb](https://opentdb.com/).

## Global state
[Context](https://reactjs.org/docs/context.html) does the job here. 

## Deployment and Hosting

Deploying with the [Vercel Platform](https://vercel.com/new) - no config deployments & hosting from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

