import { TemplatePackage } from '@leya-print/template-api';
import { Component, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'template-live',
  styleUrl: 'template-live.component.scss',
})
export class TemplateLiveComponent {
  @Prop() templates = [];  
  @State() templateUrl? : string = "";

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
    return <Host>
        <input id="live_template_url" onFocusout={this.updateTemplateUrl} value={this.templateUrl}/>
        <input id="live_template_upload_btn" type='button' onClick={() => { this.loadTemplates(); }} value="Upload" />
        <ul>
          {this.templates.map((template) => <li><a href={`./designer/${template.ident}?tplPackage=${this.templateUrl}`}>{template.title}</a><br />{template.description}</li>)}
        </ul>
    </Host>
  }
}
