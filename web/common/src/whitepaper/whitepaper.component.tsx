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
    private pageHeight = 2280;

    exportToHTML() {
        const content = this.el.shadowRoot.querySelector('#whitepaper-content').innerHTML;
        const blob = new Blob([content], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'whitepaper.html';
        link.click();
    }

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
        console.log('container.children', container.children);
            
        children.forEach((child: HTMLElement) => {
            const childHeight = Math.ceil(child.textContent.length / 20) * 16;
         
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

        console.log('pages',  pages);
        
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
                <button onClick={() => this.exportToHTML()}>Save as HTML</button>
                <section id="whitepaper-content" class="pages">
                    {this.pages.map((page, index) => (
                    <div>
                        <header class="header">
                            <img src="/assets/logo.png" alt="Logo" class="logo" />
                        </header>
                        <div class="page" innerHTML={page}>                              
                        <footer class="footer">
                            <span class="page-number">Page {index + 1}</span>
                        </footer>
                        </div>
                    </div>
                    ))}
                    </section>
            </div>
            }
        </div>
        );
    }
}