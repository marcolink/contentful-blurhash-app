import {ConfigAppSDK} from '@contentful/app-sdk';
import {Flex, Form, Heading, Paragraph} from '@contentful/f36-components';
import {useSDK} from '@contentful/react-apps-toolkit';
import {css} from 'emotion';
import {useCallback, useEffect, useState} from 'react';
import {makeContentType} from "../logic/makeContentType";
import {BLURHASH_DEFAULTS} from "../constants";

const CONTENT_TYPE_NAME = 'Blurhash Image'
export const CONTENT_TYPE_ID = 'blurhashImage'

export interface AppInstallationParameters {
}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({});
  const sdk = useSDK<ConfigAppSDK>();

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    const params = {contentTypeId: CONTENT_TYPE_ID}

    let exists = false

    try {
      const existingContentType = await sdk.cma.contentType.get(params);
      console.log({existingContentType})
      if (existingContentType) {
        exists = true;
      }
    } catch (e) {
      console.log("noop")
    }

    if (!exists) {
      const newContentType = await sdk.cma.contentType.createWithId(params, makeContentType(CONTENT_TYPE_NAME))
      await sdk.cma.contentType.publish(params, newContentType)
      console.log({newContentType})

      const editorInterface = await sdk.cma.editorInterface.get({
        contentTypeId: newContentType.sys.id
      })

      const blurhashFieldControls = {
        fieldId: BLURHASH_DEFAULTS.blurhashField,
        widgetId: sdk.ids.app,
        widgetNamespace: "app",
        settings: {
          sourceImageFieldId: BLURHASH_DEFAULTS.imageField,
          componentX: BLURHASH_DEFAULTS.componentX,
          componentY: BLURHASH_DEFAULTS.componentY
        }
      }

      editorInterface.controls = editorInterface.controls?.filter(control => control.fieldId !== BLURHASH_DEFAULTS.blurhashField) || []
      editorInterface.controls.push(blurhashFieldControls)
      await sdk.cma.editorInterface.update({contentTypeId: newContentType.sys.id}, editorInterface)
    }

    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <Flex flexDirection="column" className={css({margin: '80px', maxWidth: '800px'})}>
      <Form>
        <Heading>App Config</Heading>
        <Paragraph>Welcome to your contentful app. This is your config page.</Paragraph>
      </Form>
    </Flex>
  );
};

export default ConfigScreen;
