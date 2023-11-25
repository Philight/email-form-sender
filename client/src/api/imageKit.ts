import ImageKit from 'imagekit-javascript';
import { CONFIG } from '@data/CONFIG';
import { fetchData } from '@utils/api';

export const imageKit = new ImageKit({
  publicKey: 'public_BoLD8IW4vj4PLgREOJBXm55QDqA=',
  urlEndpoint: 'https://ik.imagekit.io/0ovzivqyfai/emlfrmsndr/email_form_sender',
});

export type ResponseType = {
  token: string;
  expire: number;
  signature: string;
};

export const getTokens = async (): Promise<ResponseType> => {
  const API_URL = new URL('http://127.0.0.1:8000/auth/v1/imagekit');

  const response = await fetchData({
    method: 'GET',
    url: API_URL,
  });
  // eslint-disable-next-line no-console
  console.log('getTokens', response);
  return response.data;
};
