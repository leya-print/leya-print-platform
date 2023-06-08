Printing-Pages
==============
The rest endpoint will call the printing pages to grep the html for the footer and the header.
It will collect the innerHTML of the ```<app-root>```-tag and all ```<style>```-tags in the html head section.

The rendering process has two steps:
1. Render header + footer with a placeholder for content. Chromium will use an [print_header_footer_template_page.html](https://source.chromium.org/chromium/chromium/src/+/main:components/printing/resources/print_header_footer_template_page.html?q=headerTemplate%20.html) to combine the header and footer html.
2. Render content, split it into pages and put every content part above the prerendered header+footer.
