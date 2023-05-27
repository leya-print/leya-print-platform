Here are some examples of "How To" for a few features of Leya.

<h4>How to deploy templates in Leya </h4>

To upload a new template in Leya a .tgz file is required, we offer from the start in the templates samples folder a few possible templates that can be modified.
After modifing the templates, in the solution "templates", go to the terminal and run the following commands:

```
npm run build
npm pack
```

After the commands have ran sucessfully a .tgz file will be created.
Download the file and using the Designer solution drag and drop the .tgz file with a new template.
After re-building the tpl-service the template will appear in the UI under the deployed templates category.