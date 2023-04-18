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
    <li><a href="#project-structure">Contact</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

Leya Print is a powerful and user-friendly tool for generating PDFs from customizable templates. Leya Print is designed to make it easy for developers to create professional-looking PDF documents for a variety of purposes.

One of the key components of Leya Print is the Designer project, which provides a visual interface for inserting content in the PDF templates. With Designer, users can easily upload custom templates that meet their specific needs, whether they're creating invoices, reports, or other types of documents.

Another important component of Leya Print is the Templates project, which allows users to create and manage different templates for use with Designer. This enables users to easily switch between different templates as needed, depending on the requirements of their projects.

Leya Print is a versatile and powerful tool that simplifies the process of generating PDFs from templates. Whether you're a developer or a non-technical user, Leya Print is a valuable resource for creating professional-looking documents quickly and easily.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps:

1. Clone the repo
2. After cloning the repo, open a terminal for each main project: 

server/rest
web/designer
web/templates

First command to type is "npm install" to get all necessary dependencies.

Second command is to startup the projects, all main projects should be running:

server/rest - npm run dev
web/designer - npm start
web/templates - npm start

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To use the tool, open the designer project url, the UI has three functionalities for users.

deployed templates: custom template modified by users and deployed for reusability.

live templates: a collection of default available template for use, such as invoices, work reports, cost tables.

upload template: drag and drop a tgz file with a new template after re-build the rest app the template will appear in the UI as a deployed template.

Clicking on a template name the user can see the template and on the right the json code to modify the fields.
After modifing the fields to the user's liking there is a preview button to generate the PDF file and if needed it can be saved from there.

### Examples

From the designer UI go to a user might click on the "invoice" template from the "live template" category.
From the upper-right box the json data will be modified to the user's liking.
When done the preview button will be clicked and the pdf is generated.

More examples to be added.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Project Structure -->
## Project Structure

This is the main project structure:

- [server](./server) backend
    - [container](./server/container/) data for deployment container
    - [rest](./server/rest/) backend rest api solution

- [web](./web) frontends
    - [designer](./web/designer) solution to upload/edit and preview printing templates
    - [templates](./web/templates) solution that holds live templates

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please check our [CONTRIBUTE](/CONTRIBUTE.md) file for instructions on how to contribute.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the Apache License Version 2.0, License. See [LICENSE](/LICENSE.md) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>