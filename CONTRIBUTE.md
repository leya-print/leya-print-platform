If you have a suggestion that would improve the project, please fork the repo and create a pull request. 
You can also simply open an issue with the tag "enhancement".

Please take into consideration the following aspects before a pull request:

<h4>1. Project structure: </h4>

Try to follow this structure for each solution in the project:

/common -> COMMON ENTITIES
      /api - shared elements between solutions

/server -> BACKEND
      /container - deployment container folder
      /pdf-service - backend api for pdf handling
      /tpl-service - backend api for template handling

/web -> FRONTEND
      /designer - solution for user interface
      /print - solution for template rendering
      /templates - solution to process templates

<h4>2. CI-pipeline: </h4>

The project contains a yml file called ".gitlab-ci.yml" that defines a CI/CD pipeline using GitLab CI. It covers multiple stages such as building APIs, services, and container images, as well as deploying to a development environment.

The file has the following stages: 
      api-build,
      build,
      container,
      deploy,
      check-status

The "api-build" and "build" stages compile different services, "api-build" is for the common elements of the other services while the "build" stage compiles the rest of services: auth-service, pdf-services, tpl-services, web-print and web-designer. 

The conditions .start_on_pr_and_default, .start_on_pr_only, and .start_on_default_only define conditional rules for pipeline stages. They allow you to specify when each job should run based on the pipeline source and branch.

In the "container" stage the jobs "build docker image (dry run)" and "build docker image" will build the Docker images for the REST server and the web designer app, respectively.

"build docker image (dry run)" builds when a merge request is successful.  
"build docker image" builds when a successful commit is done on the default branch and the docker images are pushed to a Docker registry.

The "deploy" stage has the job "deploy to dev" which deploys the Docker image to a development environment, specified by DEV_ENV_URL. Conditional logic ensures it only runs on successful builds on the default branch.

The "check-status" stage has a job that uses end-to-end testing (Playwright) it is triggered via a schedule once per day.

<h4>3. Coding and quality guidelines: </h4>

--- Under construction ---

<strong>Don't forget to give the project a star! Thanks again! </strong>