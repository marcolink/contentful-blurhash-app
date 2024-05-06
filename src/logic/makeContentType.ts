import {CreateContentTypeProps} from "contentful-management/dist/typings/entities/content-type";

export const makeContentType = (contentTypeName: string): CreateContentTypeProps => ({
    name: contentTypeName,
    displayField: 'title',
    fields: [
        {
            id: 'title',
            name: 'Title',
            required: true,
            type: 'Symbol',
            localized: false,
        },
        {
            id: 'image',
            name: 'Image',
            required: true,
            type: 'Link',
            linkType: 'Asset',
            localized: false,
        },
        {
            id: 'blurhash',
            name: 'Blurhash',
            required: true,
            type: 'Symbol',
            localized: false,
        }
    ],
});
