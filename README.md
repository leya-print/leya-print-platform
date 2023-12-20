<!-- PROJECT HEADER -->
<br />
<div align="center">
    <h3 align="center">Leya Print</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li>
    <a href="#usage">Usage </a>
     <ul>
        <li><a href="#examples">Examples</a></li>
      </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#end-to-end-tests">End-to-End Tests</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Leya Print is a powerful and user-friendly tool for generating PDFs from customizable templates. Leya Print is designed to make it easy for developers to create professional-looking PDF documents for a variety of purposes.

One of the key components of Leya Print is the Designer, which provides a visual interface for inserting content in the PDF templates. With Designer, users can easily upload custom templates that meet their specific needs, whether they're creating invoices, reports, or other types of documents.

Leya Print is a versatile and powerful tool that simplifies the process of generating PDFs from templates. Whether you're a developer or a non-technical user, Leya Print is a valuable resource for creating professional-looking documents quickly and easily.

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps:

1. Clone the repo
2. After cloning the repo, open a terminal for each main project: 

server/tpl-service
server/pdf-service
web/designer
web/print
web/templates/templates-stencil

First command to type is "npm install" to get all necessary dependencies.
Second command is to startup the projects, choose which project you want to run:

server/tpl-service: 
```
npm run dev
```
server/pdf-service:
```
npm run dev
```
web/designer:
```
npm start
```
web/print:
```
npm start
```
web/templates/templates-stencil:
```
npm start
```

If you are using gitpod with the solutions running you can use the PORTS tab to open the projects in the browser.
If you are using VS Code locally you have to open the links manually. 

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To use the tool, open the designer project URL (You can find the designer link in the PORTS tab of the IDK if you are using Gitpod, VS Code), the UI has three functionalities for users.

Deployed templates: custom templates modified by users and deployed for reusability.

Live templates: is a way to upload templates dynamically via a link. After the link is provided and button pressed the templates from the link wil appear.
A default collection is provided from the Templates project, to use it, start the project with npm start and past the link https://3333-{GITPOD-URL}/build/index.esm.js to the url textbox, remember to replace GITPOD-URL with the local url.

Upload templates: a drop zone discernible by borders with a button in the middle, in this area we can drag and drop a .TGZ file with one or more new templates.
After dropping the items, they will appear in the UI as deployed templates.

Clicking on a template name the user can see the template and, on the right, the json code to modify the fields of the template as required.
After modifying the fields to the user's liking there is a preview button to generate the PDF file and if needed it can be saved from there.

Please check our [INSTRUCTIONS](/INSTRUCTIONS.md) file for instructions.

### Examples

## Use live templates and modify a invoice template

To use the live templates and modify a template the first step is to go to the Designer UI.
From the designer UI, a user might want to use the "live templates", first we need to pass a link to some templates.
Default templates can be found in the Templates project, use the link https://3333-{LOCAL-URL}/build/index.esm.js, replace the LOCAL-URL with the gitpod url or local system url.
Press the button next to the URL textbox to display the templates.
Click on the "invoice" template from the "live templates" category.
From the upper-right box the json data will be modified to the user's needs.
When done the preview button will be clicked and the pdf is generated.

More examples coming soon.

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- Project Structure -->
## Project Structure

This is the main project structure:
- [common](./common/api) solution for common projects entities
- [e2e](./e2e) solution for end-to-end test

- [server](./server) backend
    - [container](./server/container/) data for deployment container
    - [tpl-service](./server/tpl-service/) REST API service for pdf templates
    - [pdf-service](./server/pdf-service/) REST API service for printing pdf using playwright

- [web](./web) frontends
    - [designer](./web/designer) solution to upload/edit and preview printing templates
    - [print](./web/print) solution for printing pdfs
    - [templates](./web/templates) solution that holds samples for templates

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- END TO END TESTS -->
## End-to-end-tests

To validate that all components of the system are functioning together as intended we introduced end-to-end tests.
In theory, end-to-end testing (E2E testing) is the process of testing a piece of software from start to finish as it will be used by the actual users.
 
The specs (tests) can be found under the e2e/tests folder.
There is a config file in the e2e folder to config which browser should be used for testing.

**Test Locally:**

To run the tests on a local copy of Leya, the property baseURL from the playwright.config.ts file has to be changed a valid URL (local UI service URL, deployed online version of UI).
Execute the command:

e2e/:
```
npm test
```
The command will execute the command playwright test --headed which will run the tests in an active browser.
The tests might fail at first because there are no other snapshots to compare to, running the tests again should make them pass.

**Test on Gitpod:**

Running the tests on Gitpod is a little different since they cannot run with --headed one test will always fail because without the option active a snapshot cannot be taken of a newly opened tab.

The script run-in-docker.sh can be executed to run the tests with --headed in a docker container, don't forget to change the LEYA_E2E_BASE_URL variable in the shell script.

Execute the command:

e2e/:
```
sh run-in-docker.sh
```

**Snapshosts:**

In the e2e folder there is a snapshots folder with the /user and /ci sub-directories that will hold snapshots of the tests done.
The user is for current user's instance tests and in ci are the ones from the pipeline.

**Docker/Scripts:**

For testing flexibility in ci-cd pipelines the tests are also present in a docker container, the container can be started and the tests can be ran locally as well.
The run-in-docker.sh script runs the tests in docker and shell-in-docker opens a bash terminal for any additional needs in the container.

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please check our [CONTRIBUTE](/CONTRIBUTE.md) file for instructions on how to contribute.

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the Apache License Version 2.0, License. See [LICENSE](/LICENSE) for more information.

<p align="right">(<a href="#about-the-project">back to top</a>)</p>