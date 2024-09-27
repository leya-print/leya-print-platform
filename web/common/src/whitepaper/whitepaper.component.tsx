import { Component, h, State, Element } from '@stencil/core';
import { marked } from 'marked';

@Component({
    tag: 'leya-print-whitepaper',
    styleUrl: 'whitepaper.component.scss',
    shadow: true,
})

export class Whitepaper {
    @State() markdown: string = '';   
    @State() fileName: string = ''; 
    @State() pages: string[] = [];

    @Element() el: HTMLElement;
    private pageHeight = 800;

    handleFileUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.fileName = file.name;

            const reader = new FileReader();
            reader.onload = (e: any) => {
                const fileContent = e.target.result;
                this.markdown = fileContent;
                this.splitContentIntoPages();
            };
            reader.readAsText(file);
        }
    }

    splitContentIntoPages() {
        const elementShadowRoot = this.el.shadowRoot;
        console.log('elementShadowRoot', elementShadowRoot);
        
        const container = elementShadowRoot.querySelector('#content-container');

        console.log(container);

        if (!container) {
            console.error("Content container not found");
            return;
        }
        
        const renderedHTML = marked(this.markdown || '', { async: false });
        console.log(renderedHTML);
        container.innerHTML = renderedHTML;

        const pageHeight = this.pageHeight;
        const pages: string[] = [];
        
        let currentPageHTML = '';
        let currentHeight = 0;
        
        const children = Array.from(container.children);
    
        children.forEach((child: HTMLElement) => {
        const childHeight = child.offsetHeight;
        if (currentHeight + childHeight > pageHeight) {
            pages.push(currentPageHTML);
            currentPageHTML = '';
            currentHeight = 0;
        }
        currentPageHTML += child.outerHTML;
        currentHeight += childHeight;
        });

        if (currentPageHTML) {
        pages.push(currentPageHTML);
        }

        this.pages = pages;
    }

    render() {
        return (
        <div class="whitepaper">
            <div class="file-upload">
                <input type="file" accept=".md" onChange={this.handleFileUpload.bind(this)} />
                {this.fileName ? <p>Loaded File: {this.fileName}</p> : <p>Please upload a .md file.</p>}
            </div>            
            <div id="content-container" class="content-container"></div>

            { this.markdown == '' ? '' :
            <div>
                <header class="header">
                    <img src="/assets/logo.png" alt="Logo" class="logo" />
                </header>

                <section class="pages">
                    {this.pages.map((page, index) => (
                        <div class="page" innerHTML={page}>
                        <footer class="footer">
                            <span class="page-number">Page {index + 1}</span>
                        </footer>
                        </div>
                    ))}
                    </section>
            </div>
            }
        </div>
        );
    }
}