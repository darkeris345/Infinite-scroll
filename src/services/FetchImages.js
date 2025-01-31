import config from "../config.json";

export const fetchImages = async (page) => {
  const queryParams = new URLSearchParams({
    ...config.params,
    page: page,
  });

  const response = await fetch(`${config.apiUrl}?${queryParams}`);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const data = await response.json();

  return data.photos.photo;
};
