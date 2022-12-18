import {
  of, lastValueFrom, firstValueFrom,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

import ColorsDataLayer from '../ColorsDataLayer';

jest.mock('rxjs/fetch');

describe('ColorsDataLayer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an observable of colors', async () => {
    const mockResponse = {
      ok: true,
      json: async () => [['red', 'green', 'blue'], ['purple', 'orange', 'yellow']],
    };
    (fromFetch as jest.Mock).mockReturnValueOnce(of(mockResponse));

    const colorsDataLayer = ColorsDataLayer();
    const result = await lastValueFrom(colorsDataLayer.colors$);

    expect(result).toEqual([['red', 'green', 'blue'], ['purple', 'orange', 'yellow']]);
  });

  it('should throw an error if the fetch fails', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
    };
    (fromFetch as jest.Mock).mockReturnValueOnce(of(mockResponse));

    const colorsDataLayer = ColorsDataLayer();

    await expect(firstValueFrom(colorsDataLayer.colors$))
      .rejects.toEqual(new Error("Failed to load colors: Failed with status '404 Not Found'"));
  });

  it('should throw an error if the json parsing fails', async () => {
    const mockResponse = {
      ok: true,
      json: () => {
        throw new Error('Parsing error');
      },
    };
    (fromFetch as jest.Mock).mockReturnValueOnce(of(mockResponse));

    const colorsDataLayer = ColorsDataLayer();

    await expect(firstValueFrom(colorsDataLayer.colors$))
      .rejects.toEqual(new Error('Failed to load colors: Parsing error'));
  });
});
