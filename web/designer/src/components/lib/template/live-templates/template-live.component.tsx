import { TemplatePackage } from '@leya-print/template-api';
import { Component, h, Host, Prop, State } from '@stencil/core';
import { uiStateService } from '../../ui-state/index'

@Component({
  tag: 'template-live',
  styleUrl: 'template-live.component.scss',
})
export class TemplateLiveComponent {
  @Prop({mutable: true}) templates = [];  
  @State() templateUrl? : string = "";

  async componentWillLoad() {         
    const stateTemplateURL = uiStateService.getExisting<string>('templateURL');    

    if(!!stateTemplateURL){
      this.templateUrl = stateTemplateURL
      await this.loadTemplates()
    }    
  }

  private updateTemplateUrl = (event: Event) => {
    const input = event.target as HTMLInputElement;    
    this.templateUrl = input.value;
  }

  async loadTemplates(){        
    if (this.templateUrl == "") return;

    try {
      const externalPackage = await import (this.templateUrl);      

      uiStateService.clean();
      uiStateService.create<string>('templateURL', this.templateUrl);
      uiStateService.backup();
      
      const templatePackage: TemplatePackage = externalPackage.templatePackage;
      this.templates = templatePackage.templates;
    } catch (error) {
      console.log(error);
      this.templates = [];
    };
  }

  render() {
    return <Host>
        <input id="live_template_url" onFocusout={this.updateTemplateUrl} value={this.templateUrl}/>
        <input id="live_template_connect_btn" type='button' onClick={() => { this.loadTemplates(); }} value="Connect" />
        <ul>
          {this.templates.map((template) => <li><a href={`./designer/${template.ident}?tplPackage=${this.templateUrl}`}>{template.title}</a><br />{template.description}</li>)}
        </ul>
    </Host>
  }
}
