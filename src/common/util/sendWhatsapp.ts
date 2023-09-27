import * as qs from 'qs';
import axios from 'axios';

const data = qs.stringify({
  token: 'amwpl79ehcu458x9',
  to: 'your phone',
  body: 'hi from mohammed',
});

const config = {
  method: 'post',
  url: 'https://api.ultramsg.com/instance63086/messages/chat',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: data,
};

export const sendWhtsappMessage = async () => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
