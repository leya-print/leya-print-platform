import { TemplatePackage } from '@leya-print/template-api';
import { Component, h, Host, State } from '@stencil/core';
import { env } from 'src/global/env';
import { templateService } from 'src/global/template.service';

@Component({
  tag: 'template-upload',
  styleUrl: 'template-upload.component.scss',
})
export class TemplateUploadComponent {
  @State() isFileOver = false;

  onFileDrop = (form: HTMLFormElement) => async (ev: DragEvent) => {
    console.log('drop:' , {
      ev,
      items: ev.dataTransfer.items.length,
      files: ev.dataTransfer.files.length,
    });
    const formData = new FormData(form);
    Array.from(ev.dataTransfer.files).forEach((file) => {
      formData.append('tplPackage', file);
    });

    const templateServiceBaseUrl = (await env).templateServiceBaseUrl;
    const response = await fetch(`${templateServiceBaseUrl}/tpl/`, {
      body: formData,
      method: 'POST',
    });
    const uploadedPackages: TemplatePackage[] = await response.json();
    templateService.addPackages(uploadedPackages);
  };

  onFileOver = (ev: DragEvent) => {
    ev.dataTransfer.dropEffect = 'copy';
    console.log('over', ev);
  }

  configureForm = (form: HTMLFormElement) => {
    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((evType) => {
      form.addEventListener(evType, (ev) => ev.preventDefault());
    });

    ['dragstart', 'dragover', 'dragenter'].forEach((evType) => form.addEventListener(evType, ()  => {
      if (!this.isFileOver) {
        this.isFileOver = true;
        form.classList.add('template-upload--file-over');
      }
    }));

    ['dragend', 'dragleave', 'drop'].forEach((evType) => form.addEventListener(evType, ()  => {
      if (this.isFileOver) {
        this.isFileOver = false;
        form.classList.remove('template-upload--file-over');
      }
    }));

    form.addEventListener('drop', this.onFileDrop(form));
    form.addEventListener('dragenter', this.onFileOver);
  }

  render() {
    return <Host><form ref={this.configureForm}>
      <input type="file" />
    </form></Host>
  }
}
