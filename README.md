# e ATM App using Angular 5 and Bootstrap (Javascript and CSS Frameworks)

(DEMO) Deployed on AWS : [http://eatm-deployment.s3-website.ap-south-1.amazonaws.com](http://eatm-deployment.s3-website.ap-south-1.amazonaws.com)
*To Initiate ATM app, Please click on **e ATM** text.* Please see screenshots of application **[here](https://gitlab.com/nawanshu/eAtmApp/tree/master/Application%20Screeshots)**.

This Application will simulate a withdrawal process of cash  from an ATM. The program will pay least possible number of notes/coins.

## Supporting tools and technologies used

- Angular 5.2.0
- Bootstrap 3.3.7
- TypeScript/JavaScript
- CSS
- HTML5
- Angulartics2 for Google Analytics (4.6.3)
- Integrated development environment: Visual Studio Code 1.19.2
- Build tool: Angular CLI 1.6.5
- Application Monitoring tool: Google Analytics (angulartics2: 4.6.3)
- Deployment Server: AWS (Amazon Web Server)
- Application Package Container: Docker (17.12.0)
- Package Manager: NPM (Node Package Manager)

## Get Started

This project was generated with Angular CLI version 1.6.5. There is no need to install dependencies and extra software to run this code on your machine.
Here, we are using docker container to containarised application. DockerFile is available in code along with nginix. Please follow below steps to run the appliction:

### Build the image

docker build -t eatmapp .

### Run the container

docker run -i -t -p 8080:80 eatmapp:latest   (-i, -t and latest are optional parameters)

And done, your dockerized app will be accessible at http://localhost:8080

**If you do not have docker installed, no problem, Just go ahead with Development Server Instructions.**

## Development server

- Run **npm install** to install dependecies from Node Package Manager (NPM).
- Run **ng serve** for a dev server. 
- Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run **ng generate component component-name** to generate a new component. You can also use ng generate directive|pipe|service|class|module.

## Build

Run **ng build** to build the project. The build artifacts will be stored in the dist/ directory. Use the --prod flag for a production build.
Use the --aot flag for Ahead of Time compilation.

## Running unit tests

Run **ng test** to execute the unit tests via Karma.

## Application Monitoring

Using Google Analytics for monitoring this application.

## Further help

To get more help on the Angular CLI use ng help or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).