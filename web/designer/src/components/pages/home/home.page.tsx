import type { TemplatePackage } from '@leya-print/template-api';
import { Component, h, Host, Prop, State } from '@stencil/core';
import { Subscription } from 'rxjs';
import { templateService } from 'src/global/template.service';

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
  @State() packages?: TemplatePackage[];

  private subscriptions = [] as Subscription[];

  connectedCallback() {
    this.subscriptions.push(templateService.packages$.subscribe(
      (packages) => this.packages = packages,
    ));
  }

  disconnectedCallback() {
    let subscription: Subscription | undefined;
    while(subscription = this.subscriptions.pop()) subscription.unsubscribe();
  }

  render() {
    return (
      <Host>
        <p>
          Welcome to leya print.
        </p>
        <h2>deployed templates</h2>
        {
          this.packages ? <ul>
            {this.packages.map((templatePackage) => <li>
              <h3>{templatePackage.ident}</h3>
              <span>{templatePackage.version}</span>
              <ul>
                {templatePackage.templates.map((template) => <li>
                  <a href={`./designer/${template.ident}?tplPackage=${templatePackage.id}`}>{template.title}</a><br />{template.description}
                </li>)}
              </ul>
            </li>)}
          </ul> : 'loading templates...'
        }
        <h2>live templates</h2>
        <ul>
          {this.templates.map((template) => <li><a href={`./designer/${template.ident}/`}>{template.title}</a><br />{template.description}</li>)}
        </ul>
        <template-upload></template-upload>
      </Host>
    );
  }
}
