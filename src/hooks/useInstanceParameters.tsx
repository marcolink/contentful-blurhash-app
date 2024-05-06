import {FieldAppSDK} from "@contentful/app-sdk";
import {useSDK} from "@contentful/react-apps-toolkit";
import {z} from "zod";

const Component = z.preprocess(
  (arg) => parseInt(z.string().parse(arg)),
  z.number().min(1).max(9)
)

const InstanceParameters = z.object({
  sourceImageFieldId: z.string(),
  componentX: Component,
  componentY: Component,
})

export function useInstanceParameters() {
  const sdk = useSDK<FieldAppSDK>();
  return InstanceParameters.parse(sdk.parameters.instance)
}