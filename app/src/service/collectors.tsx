import moment from "moment";
import { readRecords } from "react-native-health-connect";
import GetLocation from "react-native-get-location";

async function collectHeartBeat() {
  const startTime = moment().subtract(5, "minutes").toISOString();
  const endTime = moment().toISOString();
  console.log("Collecting heart beat", startTime, endTime);
  const heartBeat = await readRecords("HeartRate", {
    timeRangeFilter: {
      operator: "between",
      startTime,
      endTime,
    },
  });

  return {
    type: "heartBeat",
    result: heartBeat,
  };
}

async function collectGeolocation() {
  const location = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60_000,
  });
  return {
    type: "geolocation",
    currentLocation: location,
  };
}

async function collectBloodPressure() {
  const startTime = moment().subtract(5, "minutes").toISOString();
  const endTime = moment().toISOString();
  console.log("Collecting blood pressure", startTime, endTime);
  const bloodPressure = await readRecords("BloodPressure", {
    timeRangeFilter: {
      operator: "between",
      startTime,
      endTime,
    },
  });

  return {
    type: "bloodPressure",
    result: bloodPressure,
  };
}

const collectors = [collectHeartBeat, collectGeolocation, collectBloodPressure];

export default collectors;
