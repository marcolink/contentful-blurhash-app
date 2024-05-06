import {FieldAppSDK, Link} from '@contentful/app-sdk';
import {Card, MenuItem, Spinner, Text} from '@contentful/f36-components';
import {useAutoResizer, useFieldValue, /* useCMA, */ useSDK} from '@contentful/react-apps-toolkit';
import {useCreateBlurhash} from "../hooks/useCreateBlurhash";
import {useEffect} from "react";
import {BlurhashImage} from "../components/BlurhashImage";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [imageFieldValue] = useFieldValue<Link>('image')

  useAutoResizer()

  const {
    blurhash,
    blurhashIsLoading,
    createBlurhash,
    blurhashError,
    blurhashCanvas
  } = useCreateBlurhash({assetId: imageFieldValue?.sys?.id, initialBlurHash: sdk.field?.getValue()})

  // update field with generated blurhash value
  useEffect(() => {
    (async () => {
      await sdk.field.setValue(blurhash)
    })()
  }, [blurhash])

  // update blurhash with changed image
  useEffect(() => {
    if (imageFieldValue) {
      createBlurhash()
    }
  }, [imageFieldValue])

  return (
    <div>
      {blurhashCanvas}
      <Card title={'Image Blurhash'} actions={[
        <MenuItem key="reload" onClick={() => createBlurhash()}>Reload</MenuItem>
      ]}>
        {!blurhashError ?
          <>
            {/*
                        <div>
                            <TextInput value={blurhash} isDisabled={true} className={styles.blurhashInput}/>
                            <CopyButton className={styles.copyButton} value={blurhash}/>
                        </div>
                        */}
            <div>
              {
                blurhashIsLoading
                  ? <Spinner title={'generating blurhash'}/>
                  : blurhash && <BlurhashImage blurhash={blurhash} width={320} height={180}/>}
            </div>
          </>
          : <Text>{blurhashError.toString()}</Text>
        }
      </Card>
    </div>
  );
};

export default Field;
