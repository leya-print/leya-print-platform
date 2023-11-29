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
    Prefetch-img can be used in templates and will render an image that is present in the service (Designer, Print) that uses the template or a URL to get the img from net.
    Make sure the fetch does not have the no-cors mode set as it will return an opaque request.
    More info about the mode options of the fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
    The component is necessary because images will not be retained in templates as we render them via serialization from different services, the prefetch-img will get the image locally and serialize it to Base64.

    To add an image from a local service, add the component in a template, create a const for the image path and a const for URL.
    We need the URL to distinguish between which front-end service renders the template, the image must be present in the /assets/icon folder in each service.

    Example:
        // path to image
        const imagePath = '/assets/icon/leya.png'
        // url to service
        const url = window.location.href.toString().includes('/dev/') ? `/dev${imagePath}` : `/print${imagePath}`    
        // pre-fetch component
        <leya-print-image-fetch imgSrc={url}/>

    To add an image from the net all we need is the URL.

    Example:
        // url to image
        const url = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Download-Icon.png';
        // pre-fetch component
        <leya-print-image-fetch imgSrc={url}/>

    The following parameters are present:
    @Prop() imgSrc: string;    

    - imgSrc refers to image source and is the a string that represents the system path to where the image is located.
    The image must be present locally in the respective front end application such as designer and/or print.

    Image size:
    The size of the fetched image will be the size of the parent component.
    For example we can we make a div with a certain height and width our image will inherit this size.

    <div class="invoice-header__img"><div class="invoice-header__img-size"><leya-print-image-fetch imgSrc={url}/></div></div>

    the class invoice-header__img defines how the section will look, the inovice-header__img-size class is responsible for the size of the image.
    
    .invoice-header__img-size{
            width: 110px;
            height: 70px;
        }

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
