import moment from 'moment';
import { readRecords } from 'react-native-health-connect';
import GetLocation from 'react-native-get-location';

async function collectHeartBeat() {
  const startTime = moment().subtract(5, 'minutes').toISOString();
  const endTime = moment().toISOString();
  const heartBeat = await readRecords('HeartRate', {
    timeRangeFilter: {
      operator: 'between',
      startTime,
      endTime,
    },
  });

  return {
    type: 'bpm',
    result: heartBeat,
  };
}

async function collectGeolocation() {
  const location = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60_000,
  });
  return {
    type: 'gps',
    currentLocation: location,
  };
}

async function collectBloodPressure() {
  const startTime = moment().subtract(5, 'minutes').toISOString();
  const endTime = moment().toISOString();
  const bloodPressure = await readRecords('BloodPressure', {
    timeRangeFilter: {
      operator: 'between',
      startTime,
      endTime,
    },
  });

  return {
    type: 'pressao',
    result: bloodPressure,
  };
}

const collectors = {
  'bpm': collectHeartBeat,
  'pressao': collectBloodPressure,
  'gps': collectGeolocation,
};

export default collectors;
