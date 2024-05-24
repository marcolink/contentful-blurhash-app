import {CreateContentTypeProps} from "contentful-management/dist/typings/entities/content-type";
import {BLURHASH_DEFAULTS} from "../constants";

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
            id: BLURHASH_DEFAULTS.imageField,
            name: 'Image',
            required: true,
            type: 'Link',
            linkType: 'Asset',
            localized: false,
        },
        {
            id: BLURHASH_DEFAULTS.blurhashField,
            name: 'Blurhash',
            required: true,
            type: 'Symbol',
            localized: false,
        }
    ],
});
