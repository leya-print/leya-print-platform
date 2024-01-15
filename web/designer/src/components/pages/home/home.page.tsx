// import type { TemplatePackage } from '@leya-print/template-api';
import type { TemplatePackage } from '/workspace/leya-print/common/template-api/types';
import { Component, h, Host, Prop, State } from '@stencil/core';
import { Subscription } from 'rxjs';
import { templateService } from 'src/global/template.service';

@Component({
  tag: 'home-page',
  styleUrl: 'home.page.scss',
  shadow: false,
})
export class HomePage {
  @Prop() templates = [];
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
          Welcome to Leya Print!
        </p>
        <h2>Deployed templates</h2>
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
        <h2>Live templates</h2>
        <template-live templates={this.templates}></template-live>
        <template-upload></template-upload>
      </Host>
    );
  }
}
