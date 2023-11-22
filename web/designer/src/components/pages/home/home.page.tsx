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
  @Prop() templates = [];

  @State() packages?: TemplatePackage[];
  @State() templateUrl? : string = ""

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
  private updateTemplateUrl = (event: Event) => {
    const input = event.target as HTMLInputElement;    
    this.templateUrl = input.value;
  }

  async loadTemplates(){        
    if (this.templateUrl == "") return;    
    const externalPackage = await import (this.templateUrl);    

    const templatePackage: TemplatePackage = externalPackage.templatePackage;
    this.templates = templatePackage.templates;    
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
        <input id="live_template_url" onFocusout={this.updateTemplateUrl} value={this.templateUrl}/>
        <input id="live_template_upload_btn" type='button' onClick={() => { this.loadTemplates(); }} value="Upload" />
        <ul>
          {this.templates.map((template) => <li><a href={`./designer/${template.ident}/`}>{template.title}</a><br />{template.description}</li>)}
        </ul>
        <template-upload></template-upload>
      </Host>
    );
  }
}
