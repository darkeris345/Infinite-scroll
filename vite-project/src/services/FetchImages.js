import config from '../config.json';

export const fetchImages = async (page) => {

  const queryParams = new URLSearchParams({
    ...config.params,
    page: page,
    per_page: 10
  });

  const response = await fetch(`${config.apiUrl}?${queryParams}`);
  const data = await response.json();
  return data.photos.photo;
};