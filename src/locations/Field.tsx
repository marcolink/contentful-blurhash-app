import {FieldAppSDK} from '@contentful/app-sdk';
import {useAutoResizer, useSDK} from '@contentful/react-apps-toolkit';
import {BlurhashFieldEditor} from "../components/BlurhashFieldEditor";
import {Note} from "@contentful/f36-components";
import {useContentTypeLink} from "../hooks/useContentTypeLink";
import {useInstanceParameters} from "../hooks/useInstanceParameters";

const Field = () => {
  useAutoResizer()
  const sdk = useSDK<FieldAppSDK>();
  const contentTypeLink = useContentTypeLink();
  const parameters = useInstanceParameters()
  const sourceField = sdk.contentType.fields.find((field) => field.id === parameters.sourceImageFieldId);

  const sourceFieldExists = !!sourceField;
  const isValidSourceImage = sourceFieldExists && sourceField?.type === 'Link' && sourceField.linkType === 'Asset';

  if(isValidSourceImage) {
    return <BlurhashFieldEditor />
  }

  return (
    <Note variant={'negative'} title={'Not configured'}>
      This app requires a field of type <strong>Link</strong> to an <strong>Asset</strong> with the id <code>{parameters.sourceImageFieldId}</code> to be
      present on the <a href={contentTypeLink} target={'_blank'}>content type</a>.
      Ideally, the field is restricted to only allow image assets.
    </Note>
  )

};

export default Field;
