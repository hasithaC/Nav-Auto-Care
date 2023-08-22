import axios from 'axios';

const callService = async (URL: string) => {
  let response_data = {};
  try {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(URL)
        .then(response => {
          response_data = response.data;
          resolve(response_data);
          //console.log(response.data);
        })
        .catch(error => {
          reject(error);
          console.log(`SERVICE_ERROR ${URL} =>`, error);
        });
    });
  } catch (error) {
    console.log(`SERVICE_ERROR ${URL} =>`, error);
  }
};

export {callService};
