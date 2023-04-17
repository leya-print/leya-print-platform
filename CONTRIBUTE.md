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

The project contains a yml file called ".gitlab-ci.yml" that defines a CI/CD pipeline that builds and deploys a Node.js REST server and a web designer app, and also builds Docker images for those apps and pushes them to a Docker registry.

The file has two stages: build and container.

In the "build" stage the jobs "build pdf-services", "build tpl-services", "build web-print" and "build web-designer" run. These are the four jobs that will build the REST server and the web designer app, respectively. The rules field defines when the jobs should run based on the pipeline source (merge event) and commit branch (default). The script field contains the commands that will be executed to build the apps for our apps there are shell files that will run npm build commands, and the artifacts field specifies what files should be saved as build artifacts after the job is complete.

In the "container" stage the jobs "build docker image (dry run)" and "build docker image" will build the Docker images for the REST server and the web designer app, respectively.

"build docker image (dry run)" builds when a merge request is successful.  

"build docker image" builds when a successful commit is done on the default branch and the docker images are pushed to a Docker registry.

<h4>3. Coding and quality guidelines: </h4>

--- Under construction ---

<strong>Don't forget to give the project a star! Thanks again! </strong>
