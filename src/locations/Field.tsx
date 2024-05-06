import {FieldAppSDK, Link} from '@contentful/app-sdk';
import {Card, Spinner, Text, TextInput} from '@contentful/f36-components';
import {useAutoResizer, useFieldValue, useSDK} from '@contentful/react-apps-toolkit';
import {useCreateBlurhash} from "../hooks/useCreateBlurhash";
import {useEffect} from "react";
import {BlurhashImage} from "../components/BlurhashImage";
import {useUpdateBlurhash} from "../hooks/useUpdateBlurhash";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [imageFieldValue] = useFieldValue<Link>('image')

  useAutoResizer()

  const {
    blurhash,
    blurhashIsLoading,
    blurhashError,
    blurhashCanvas
  } = useCreateBlurhash({assetId: imageFieldValue?.sys?.id, initialBlurHash: sdk.field?.getValue()})

  const {mutate: updateBlurhash} = useUpdateBlurhash(sdk.field!)

  // update field with generated blurhash if value is changed
  useEffect(() => {
    updateBlurhash(blurhash || '')
  }, [blurhash])

  return (
    <div>
      {blurhashCanvas}
      <Card title={'Image Blurhash'}>
        {!blurhashError ?
          <>
            <div>
              {
                blurhashIsLoading && !blurhash
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
