import {useCreateBlurhash} from "../hooks/useCreateBlurhash";
import {useUpdateBlurhash} from "../hooks/useUpdateBlurhash";
import {useEffect} from "react";
import {Card, Flex, Note, Skeleton} from "@contentful/f36-components";
import {Blurhash} from "react-blurhash";
import {useFieldValue, useSDK} from "@contentful/react-apps-toolkit";
import {FieldAppSDK, Link} from "@contentful/app-sdk";
import {css} from "emotion";
import tokens from "@contentful/f36-tokens";
import {useInstanceParameters} from "../hooks/useInstanceParameters";

//https://github.com/contentful/field-editors/blob/master/packages/reference/src/assets/WrappedAssetCard/WrappedAssetCard.tsx#L121C36-L121C39
const ASSET_HEIGHT = 300

// Not sure why this is required :shrug:
const DISPLAY_SCALE_FACTOR = .87

type Props = {
};

const styles = {
  root: css({
    display: 'inline-flex',
    width: 'auto',
    borderRadius: 'unset',
    minWidth: `calc(1rem * (120 / ${tokens.fontBaseDefault}))`,
    minHeight: `calc(1rem * (200 / ${tokens.fontBaseDefault}))`,
    padding: 0,
    textAlign: 'center',
    overflow: 'hidden'
  }),
}

export function BlurhashFieldEditor({}: Props) {
  const sdk = useSDK<FieldAppSDK>();
  const parameters = useInstanceParameters()
  const [imageFieldValue] = useFieldValue<Link>(parameters.sourceImageFieldId)
  const {
    blurhash,
    blurhashIsLoading,
    blurhashError,
    blurhashCanvas,
    width,
    height,
  } = useCreateBlurhash({
    assetId: imageFieldValue?.sys?.id,
    initialBlurHash: sdk.field?.getValue(),
    height: ASSET_HEIGHT,
    componentX: parameters.componentX,
    componentY: parameters.componentY,
  })

  const {
    mutate: updateBlurhash
  } = useUpdateBlurhash(sdk.field!)

  useEffect(() => {
    updateBlurhash(blurhash || '')
  }, [blurhash, updateBlurhash])

  return blurhashError
    ? <Note variant={'warning'}>{blurhashError.toString()}</Note>
    : (
      <div>
        {blurhashCanvas}
        <Card padding={'none'} className={styles.root}>
          <Flex alignItems="center" fullHeight justifyContent="center">
            {
              blurhashIsLoading && !blurhash
                ? <Skeleton.Image width="100%" height="18.75rem"/>
                : blurhash &&
                  <Blurhash
                      hash={blurhash}
                      width={width * DISPLAY_SCALE_FACTOR}
                      height={height * DISPLAY_SCALE_FACTOR}
                  />
            }
          </Flex>
        </Card>
      </div>
    )
};