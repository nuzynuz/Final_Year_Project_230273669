import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const addListing = (listing, onUploadProgress) => {
  //listing is a object
  //header has content-type. to specify what kind of data we send in request
  //JSON type :- application/json - autoamtcally assign when pass json
  //For Uploading fiels or images :- multipart/form-data.
  //If we use FormData it automaically set above type.

  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    // axios configuration object.
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

//Export all methods
export default {
  getListings,
  addListing,
};
