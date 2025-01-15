import dayjs, { Dayjs } from "dayjs";

import client from "./client";
import RFIDclient from "./RFIDclient";

const endpoint = "/tag";

const getWeightages = (supplierCode) =>
  client.get(`${endpoint}/${supplierCode}`);

const addWeightage = (FormData, onUploadProgress) => {
  //listing is a object
  //header has content-type. to specify what kind of data we send in request
  //JSON type :- application/json - autoamtcally assign when pass json
  //For Uploading fiels or images :- multipart/form-data.
  //If we use FormData it automaically set above type.
  const tag = {
    teaBucket: {
      weight: FormData.teaBucket.weight,
      waterWeight: FormData.teaBucket.waterWeight,
      bagWeight: FormData.teaBucket.bagWeight,
      netWeight: FormData.teaBucket.netWeight,
      qualityGrade: FormData.teaBucket.qualityGrade,
      remarks: FormData.teaBucket.remarks,
      farmerId: FormData.teaBucket.farmerId,
      tag: {
        tagId: FormData.RFIDTagValue,
        status: "active",
        activatedTime: "",
        releaseTime: "",
      },
    },
  };

  tag.teaBucket.netWeight =
    parseFloat(tag.teaBucket.weight) -
    (parseFloat(tag.teaBucket.waterWeight) +
      parseFloat(tag.teaBucket.bagWeight));

  return client.post(endpoint, tag, {
    // axios configuration object.

    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getRFID = () => RFIDclient.get(`get-rfid`);

const verifyWeight = (rfid, weight) =>
  client.post(`${endpoint}/verify`, { rfid, weight });

const addVialation = (reportDesc, loginId) =>
  client.post("/vialations", { description: reportDesc, loginId: loginId });

//Export all methods
export default {
  getWeightages,
  addWeightage,
  getRFID,
  verifyWeight,
  addVialation,
};
