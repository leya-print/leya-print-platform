# Leya-Print Common Project

## Introduction
Shared web components and utilities for Leya-Print front-end services.

## Installation
```bash
npm install leya-print-stencil
```

## List of components
graph-paper:
    Component that will render a grid with squares of approximately 1cm on printed paper.
    Component has a service that can activate the grid, to activate it the param in URL raster indicates the signal to render the grid (url.searchParams.get('raster')).    
    The params width and height can be set for larger types of paper/templates.

    @Prop() width: string = '21cm';
    @Prop() height: string = '29.7cm';

prefetch-img:
    Component that will fetch an image and render it in Base64 in a template.
    Prefetch-img can be used in templates and will render an image that is present in the service (Designer, Print) that uses the template.    
    The component is necessary because images will not be retained in templates as we render them via serialization from different services, the prefetch-img will get the image locally and serialize it to Base64.

    To add image, add the component in a template, create a const for the image path and a const for URL.
    We need the const URL to distinguish between which front-end service renders the template, the image must be present in the /assets/icon folder in each service.

    The following parameters are present:
    @Prop() imgSrc: string;
    @Prop() position: string;

    - imgSrc refers to image source and is the a string that represents the system path to where the image is located.
    The image must be present locally in the respective front end application such as designer and/or print.

    - position is a string that indicates where the image should be positioned, on the left side, right side or center of the page.
    The position can be indicate with the following strings: "left", "right", "center"
    
    Example:
        const imagePath = '/assets/icon/leya.png'
        const url = window.location.href.toString().includes('/dev/') ? `/dev${imagePath}` : `/print${imagePath}`    
        <leya-print-image-fetch imgSrc={url} position="left"/>

watermark:
    Component that will show a watermark text over a template.
    Watermark text is taken from the url param watermark.

    Example:
    watermark=test

## Usage
To use the common components first the project must be built

```bash
npm run build

```

Then a local .tgz file needs to be created.
The other projects reference the .tgz file and will use the components from the archive.

```bash
npm pack

```

See individual component documentation for usage guidelines.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).

## License
This project is licensed under the Apache-2.0 License.

## Contact
Email: info@leya-it-solutions.de
