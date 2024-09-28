const mockCma: any = {
  editorInterface: {
    get: async (params: any) => {
      return {
        controls: []
      };
    },
    update: async (params: any, editorInterface: any) => {
      return editorInterface;
    }
  },
  contentType: {
    createWithId: async (params: any, contentType: any) => {
      return {...contentType, sys: {id: params.contentTypeId}};
    },
    publish: async (params: any, contentType: any) => {
      return contentType;
    },
    get: async (params: any) => {
      return null;
    }
  }
};

export { mockCma };
