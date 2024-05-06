# Contentful Blurhash App

> A [Contentful](https://www.contentful.com/developers/docs/extensibility/app-framework/) field editor app to generate a blurhash representation of an image. 

![blurhash-entry.png](images%2Fblurhash-entry.png)

## 1 click installation

[![Install to Contentful](https://www.ctfstatic.com/button/install-small.svg)](https://app.contentful.com/deeplink?link=apps&id=6EgmuKsOM0M1hPRhd9Zo75)

## Setup
During the installation process, the app will automatically create a new [content type](./src/logic/makeContentType.ts) called `Blurhash Image` with a field called `Image` which will act as the blurhash source, and a field called `Blurhash` which will store the generated blurhash value.

![blurhash-setup.png](images%2Fblurhash-setup.png)
You need to manually configure the blurhash field appearance by assigning any `ShortText` field to the `Blurhash` app.

### Configuration

The app works out of the box without any further configuration. However, you can adjust the blurhash parameters to your needs. The app supports the following parameters:

- **Source Image Field ID**: The ID of the field that contains the image to generate the blurhash from. The default value is `image`.
- **Component X**: The number of components in the X direction. The default value is 4.
- **Component Y**: The number of components in the Y direction. The default value is 3.

> [How to pick the right amount of components?](https://github.com/woltapp/blurhash?tab=readme-ov-file#how-do-i-pick-the-number-of-x-and-y-components)

## Demo

https://marcolink.github.io/contentful-blurhash-app/

# Development
## Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in Contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

#### `npm run upload`

Uploads the `dist` folder to Contentful and creates a bundle that is automatically activated.
The command guides you through the deployment process and asks for all required arguments.
Read [here](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful) for more information about the deployment process.

#### `npm run upload-ci`

Similar to `npm run upload` it will upload your app to contentful and activate it. The only difference is  
that with this command all required arguments are read from the environment variables, for example when you add
the upload command to your CI pipeline.

For this command to work, the following environment variables must be set:

- `CONTENTFUL_ORG_ID` - The ID of your organization
- `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle
- `CONTENTFUL_ACCESS_TOKEN` - A personal [access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)

## Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.
