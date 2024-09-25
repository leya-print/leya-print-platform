import { Component, h, Host, Prop } from '@stencil/core';
import { marked } from 'marked';
import { createDOMPurify  } from 'dompurify';

@Component({
    tag: 'leya-print-whitepaper',
    styleUrl: 'whitepaper.component.scss',
})

export class Whitepaper {
    @Prop() markup: string;
    private whitepaper: string;

    async componentWillLoad() {
        const DOMPurify = createDOMPurify(window as any);
        const convertedWhitepaper = DOMPurify.sanitize(marked.parse(this.markup));
        this.whitepaper = convertedWhitepaper;
    }

    render() {
        return (<Host>
            <h2>This is whitepaper component</h2>
            {this.whitepaper}
        </Host>)
    }
}