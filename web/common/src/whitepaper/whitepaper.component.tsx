import { Component, h, State } from '@stencil/core';
import { marked } from 'marked';

@Component({
    tag: 'leya-print-whitepaper',
    styleUrl: 'whitepaper.component.scss',
})

export class Whitepaper {
    @State() markdown: string = '';   
    @State() fileName: string = ''; 

    handleFileUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.fileName = file.name;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const fileContent = e.target.result;
            this.markdown = fileContent;
        };
        reader.readAsText(file);
        }
    }

    private getMarkdownAsHtml(): string {
        return marked(this.markdown, { async: false });
    }

    render() {
        return (
        <div class="whitepaper">
            <div class="file-upload">
            <input type="file" accept=".md" onChange={this.handleFileUpload.bind(this)} />
            {this.fileName ? <p>Loaded File: {this.fileName}</p> : <p>Please upload a .md file.</p>}
            </div>

            { this.markdown == '' ? <p>Please upload a .md file.</p> :
            <div>
                <header class="header">
                <img src="/assets/logo.png" alt="Logo" class="logo" />
                </header>

                <section class="content" innerHTML={this.getMarkdownAsHtml()}></section>

                <footer class="footer">
                <span class="page-number">Page 1</span> {/* Dynamic page number logic */}
                </footer>
            </div>
            }
        </div>
        );
    }
}