import { vi } from 'vitest';
import {mockCma} from "./mockCma";
import {BLURHASH_DEFAULTS} from "../../src/constants";

const mockSdk: any = {
  cma: mockCma,
  app: {
    onConfigure: vi.fn(),
    getParameters: vi.fn().mockReturnValueOnce({}),
    setReady: vi.fn(),
    getCurrentState: vi.fn(),
  },
  ids: {
    app: 'test-app',
  },
  parameters: {
    instance: {
      sourceImageFieldId: 'image',
      blurhashField: 'blurhash',
      componentX: '4',
      componentY: '3',
    }
  }
};

export { mockSdk };
