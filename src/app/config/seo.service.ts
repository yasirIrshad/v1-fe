import { Injectable } from '@angular/core';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';

export interface PageMetadata {
  title: string;
  description: string;
  image: string;
  author: string;
  keywords: string[];
  type: string;
}

const defaultMetadata: PageMetadata = {
  title: 'Studio On Sunset: Stream Performances Live and Online',
  description: 'Premier streaming platform for emerging and major artist.',
  image: 'https://sos-prod.fra1.cdn.digitaloceanspaces.com/sos-og.png',
  author: 'Ethan Miguire',
  keywords: ['Streaming', 'Stream', 'Studio On Sunset', 'Best streaming platform for artist'],
  type: 'www.studioonsunset.com',
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private metaTagService: Meta,
    private titleService: Title
  ) { }

  public updateMetadata(metadata: Partial<PageMetadata>, index: boolean = true): void {
    const pageMetadata: PageMetadata = {...defaultMetadata, ...metadata};
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);

    this.metaTagService.addTags([
     ...metatags,
     { property: 'og:url', content: `www.studioonsunset`},
    ]);

    this.titleService.setTitle(pageMetadata.title);
  }

  private generateMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    return [
      { name: 'title', content: metadata.title },
      { property: 'og:title', content: metadata.title },

      { name: 'description', content: metadata.description },
      { property: 'og:description', content: metadata.description },

      { name: 'image', content: metadata.image },
      { property: 'og:image', content: metadata.image },

      { name: 'author', content: metadata.author },
      { property: 'og:author', content: metadata.author },

      { name: 'keywords', content: metadata.keywords.join(', ') },

      { property: 'og:type', content: metadata.type },
    ];
  }
}
