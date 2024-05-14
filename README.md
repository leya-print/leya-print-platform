# Leya Print Platform

## Layout Your PDFs Using Web Technologies! 🌐🚀🖨️

With the Leya Print Platform, you can harness HTML, CSS, and even TypeScript to craft 
professionally looking PDFs directly from your data. Sure, you could link together some 
Open-Source projects and build your own printing pipeline—as our code demonstrates, that's 
exactly what we're doing. But how do you convince management that this approach is reliable 
and future-proof? What about security, scalability, quality gates, and long-term support? 🙈

The Leya Print Platform offers a proven solution with professional support, enabling you to 
introduce this innovative printing method within your company with confidence. 🌐 + 💼🔒 = 
🚀🖨️

## How it works

The Leya Print Platform consists of several services that can be deployed as Docker nodes
within a Kubernetes cluster or installed on a single system, ensuring scalability and
reliability. Here's a breakdown of the core components:

- **Document Generator (pdf-service):** This is the heart of Leya Print, responsible for
creating final PDF documents from your data, adhering to your specifications. It utilizes
templates stored in the Template Management System and populates them with data received
via secure HTTP endpoints.

- **Template Management System (tpl-service):** Manages all templates used across your
organization, allowing for the addition, updating, and selection of templates for document
creation. It features customizable selection criteria for templates to meet diverse
business scenarios.

Additional services include:

- **Access Control (auth-service):** Enhances security by regulating access to the Leya
Print system through external authentication services, ideal for enterprises with their
own user management systems.

- **Remote Template Development Tool (web/designer):** Accessible via a web interface,
this tool allows developers and administrators to preview and test template changes in
real time before going live. It also facilitates the management of the Template Management
System, simplifying administration and customization.

With these components, Leya Print not only ensures efficient and flexible document creation
but also aligns with modern IT infrastructure requirements, making it a robust solution for
your business document needs.

For a full description of the project structure and detailed information about each component,
please refer to our [Project Structure Documentation](./docs/project-structure.md).

## Getting Started
### Quick Start in Gitpod

Gitpod is a ready-to-code dev environment with a single click, allowing you to start coding with zero configuration. This means you can access a fully functional development environment for Leya Print directly from your browser.

Get started with Leya Print instantly using our pre-configured Gitpod environment. Just click the button below to launch Leya Print in Gitpod:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/leya-print/leya-print-platform)

### Launch Locally

For those who prefer working in their local dev environment, we've provided a convenient VS Code configuration that makes it easy to start Leya Print on your own machine. Simply check out the repository and open it in your local VS Code installation, which should start up all the services automatically. If you want to use another IDE or if you are looking for a more detailed startup description, refer to our [startup-details.md](./docs/startup-details.md).

## Key Benefits of Leya Print

- 🛠️ **Designed by Developers, for Developers**  
  Leya Print was crafted from the ground up by developers and software architects who understand the pain points in PDF generation. The platform is optimized for ease of use, efficiency, and integration, ensuring that it addresses real-world development challenges effectively.

- 🔧 **Extensibility and Customization**  
  Leya Print is designed with flexibility in mind, featuring specific extension points for authentication, template storage, and template selection logic. This allows developers to tailor the platform to their unique requirements, enhancing functionality and adaptability.

- 🌐 **Leveraging a Larger Web Developer Community**  
  While Leya Print is developed and maintained by Leya IT Solutions GmbH, we value contributions and suggestions from the community. The platform benefits significantly from the broader web developer community, which offers extensive support and solutions for layout-related challenges, far surpassing the support available for proprietary PDF generators.

- 🔓 **Open Source Transparency**  
  As an open-source platform, Leya Print offers transparency that fosters trust and collaboration. Developers have the freedom to inspect the code, contribute improvements, and ensure that the platform meets their security and functionality standards.

- 🛡️ **Security by Design**  
  Leya Print prioritizes security by design, ensuring that no user data is permanently stored by the system. This approach minimizes data exposure and privacy risks. Additionally, Leya Print is designed to be installed within a company's own infrastructure rather than as a purely SaaS solution. This allows for greater control over security measures and aligns with corporate policies that may restrict the use of external servers for sensitive data handling.

## Community and Support

If you have questions or need help, the preferred way to contact us is through our [GitHub issues](https://github.com/leya-print/leya-print-platform/issues) or by [email](mailto:support@leya-it-solutions.de). For direct interaction and quicker responses, these channels are actively monitored by our development team.

For more structured support, Leya Print offers tailored support plans that include direct access to our developers, priority issue handling, and personalized assistance. These plans are designed to provide the professional support needed to integrate and utilize Leya Print effectively in your business operations. 

Explore our support options to find the right level of service for your needs, and ensure your projects are successful with Leya Print's robust support structure.

## License

Distributed under the Apache License Version 2.0, License. See [LICENSE](./LICENSE) for more information.
