import { Component, h, Prop } from '@stencil/core';
import { env } from '../env';

@Component({
    tag: 'leya-print-image-fetch',
    styleUrl: 'prefetch-img.component.scss',
})

export class ImageFetchTpl {
    @Prop() imgSrc: string;

    private convertedImg: string;

    async fetchImage(url: string) {
        const response = await fetch(url);
        const blob = await response.blob();

        return blob;
    }

    async blobToBase64(blob: Blob): Promise<string | ArrayBuffer | FileReader> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(blob);
        });
    }

    async loadImage(): Promise<string> {
        const tplUrl = await this._tplBaseUrl()
        const imageUrl = tplUrl + this.imgSrc

        const imageBlob = await this.fetchImage(imageUrl);
        const imageBase64 = await this.blobToBase64(imageBlob);
        return imageBase64 as string;
    }

    private async _tplBaseUrl() {
        const { templateServiceBaseUrl } = await env;
    
        return `${templateServiceBaseUrl}/tpl-contents/`;
    }

    async componentWillRender() {
        const convertedImg = await this.loadImage();
        this.convertedImg = convertedImg;
    }

    render() {
        return (<div class="prefetch-img-size">
            <img src={this.convertedImg} alt="Company Logo" class="prefetch-img-size" />
        </div>)
    }
}