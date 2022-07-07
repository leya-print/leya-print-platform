import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'home-page',
  styleUrl: 'home.page.scss',
  shadow: false,
})
export class AppHome {
  @Prop() templates = [
    { ident: 'template-demo', title: 'demo', description: 'demo template that shows header, content and footer usage' },
    { ident: 'invoice', title: 'invoice', description: 'invoices for customers' },
    { ident: 'work-report', title: 'work report', description: 'work log of hours and tasks' },
  ];
  render() {
    return (
      <Host>
        <p>
          Welcome to leya print.
        </p>
        <h2>templates</h2>
        <ul>
          {this.templates.map((template) => <li><a href={`./designer/${template.ident}/`}>{template.title}</a><br />{template.description}</li>)}
        </ul>
      </Host>
    );
  }
}
