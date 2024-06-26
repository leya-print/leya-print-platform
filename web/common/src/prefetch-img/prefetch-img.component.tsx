import { Component,  h, Prop, getAssetPath } from '@stencil/core';
import { env } from '../env';

@Component({
    tag: 'leya-print-image-fetch',
    styleUrl: 'prefetch-img.component.scss',
  })

  export class ImageFetchTpl{
    @Prop() imgSrc: string;
    @Prop() imgAlt: string;

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
        if (this.imgSrc.includes('http')) {            
            const imageBlob = await this.fetchImage(this.imgSrc);
            const imageBase64 = await this.blobToBase64(imageBlob);
            return imageBase64 as string;
        }

        const assetPath = this.imgSrc.split('/').slice(-2);
        const assetUrl = `/dist/${assetPath[0]}/${assetPath[1]}`;
        const tplUrl = await this._tplBaseUrl()
        const imageUrl = tplUrl + assetUrl

        const imageBlob = await this.fetchImage(imageUrl);
        const imageBase64 = await this.blobToBase64(imageBlob);
        return imageBase64 as string;
    }

    async assetExists(assetName: string): Promise<boolean> {
        try {
            const res = await fetch(getAssetPath(assetName));            
            
            if (res.ok){
                return true;
            }

            return false
        } catch (error) {
            return false;
        }
    }

    private async _tplBaseUrl() {
        const { templateServiceBaseUrl } = await env;

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const tplPackage = urlParams.get('tplPackage')        

        if (tplPackage.startsWith('http')) return tplPackage;

        return `${templateServiceBaseUrl}/tpl-contents/${tplPackage}`;
    }

    async componentWillRender() {
        const convertedImg = await this.loadImage();
        this.convertedImg = convertedImg;
    }    

    render() {        
        return (<div class="prefetch-img-size">
            <img src={this.convertedImg} alt={this.imgAlt} class="prefetch-img-size"/> 
        </div>)
    }
}