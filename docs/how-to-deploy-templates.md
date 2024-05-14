# How to deploy templates to the Leya Print Platform

To upload a new template in Leya a .TGZ file is required, we offer from the start in the templates samples folder a few possible templates that can be modified. 
After modifying the templates, in the solution "templates", go to the terminal and run the following commands:

```
npm run build
npm pack
```

After the commands have run successfully a .TGZ file will be created. 
Download the file and using the Designer solution drag and drop the .TGZ file with a new template into the drop-zone in the Designer interface. (the drop-zone is in the Designer main page and denoted by a dotted border) 
After re-building the tpl-service the template will appear in the UI under the deployed templates category.
