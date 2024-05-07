import {useMutation} from "@tanstack/react-query";
import {FieldAPI} from "@contentful/app-sdk";

export function useUpdateBlurhash(field: FieldAPI) {
  return useMutation({
    mutationFn: async (blurhash: string) => {
      if (field.getValue() !== blurhash) {
        return field.setValue(blurhash)
      }
    },
  })
}