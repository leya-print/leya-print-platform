import { Component, h, State, Element } from '@stencil/core';
import { marked } from 'marked';

@Component({
    tag: 'leya-print-markdown-converter',
    styleUrl: 'markdown-converter.component.scss',
    shadow: true,
})

export class MarkdownConverter {
    @State() markdown: string = '';   
    @State() fileName: string = ''; 
    @State() markdownHtml: string = '';
    @Element() el: HTMLElement;

    exportToHTML() {
        const content = this.el.shadowRoot.querySelector('#converted-content').innerHTML;
        const blob = new Blob([content], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'markdown_converted.html';
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
                this.convertHtml();
            };
            reader.readAsText(file);
        }
    }

    convertHtml() {
        const renderedHTML = marked(this.markdown || '', { async: false });
        this.markdownHtml = renderedHTML;
    }

    render() {
        return (
        <div class="converter">
            <div class="file-upload">
                <input type="file" accept=".md" onChange={this.handleFileUpload.bind(this)} />
                {this.fileName ? <p>Loaded File: {this.fileName}</p> : <p>Please upload a .md file.</p>}
            </div>

            { this.markdown == '' ? '' :    
            <div class={"markdown-div"}>
                <button class={"button"} type="button" onClick={() => this.exportToHTML()}>Export to HTML</button>
                <section id="converted-content">
                        {this.markdownHtml}
                </section>
            </div>
            }
        </div>
        );
    }
}