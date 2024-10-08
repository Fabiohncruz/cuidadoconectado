import * as React from 'react';

import { Alert, Button, StyleSheet, View } from 'react-native';
import {
  aggregateRecord,
  getGrantedPermissions,
  getSdkStatus,
  initialize,
  insertRecords,
  openHealthConnectDataManagement,
  openHealthConnectSettings,
  readRecord,
  readRecords,
  requestPermission,
  revokeAllPermissions,
  SdkAvailabilityStatus,
} from 'react-native-health-connect';

const getLastWeekDate = (): Date => {
  return new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
};

const getLastTwoWeeksDate = (): Date => {
  return new Date(new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000);
};

const getTodayDate = (): Date => {
  return new Date();
};

export default function App() {
  const initializeHealthConnect = async () => {
    const result = await initialize();
    console.log({ result });
  };

  const checkAvailability = async () => {
    const status = await getSdkStatus();
    if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
      console.log('SDK is available');
    }

    if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
      console.log('SDK is not available');
    }

    if (
      status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
    ) {
      console.log('SDK is not available, provider update required');
    }
  };

  const insertSampleData = () => {
    insertRecords([
      {
        recordType: 'HeartRate',
        samples: [
          {
            time: getTodayDate().toISOString(),
            beatsPerMinute: 25,
          },
        ],
        startTime: getTodayDate().toISOString(),
        endTime: new Date().toISOString(),
      },
    ]).then((ids) => {
      console.log('HeartRate inserted ', { ids });
    });
    insertRecords([
      {
        recordType: 'BloodPressure',
        time: getTodayDate().toISOString(),
        systolic: { value: 120, unit: 'millimetersOfMercury' },
        diastolic: { value: 80, unit: 'millimetersOfMercury' },
        bodyPosition: 0,
        measurementLocation: 0,
      },
    ]).then((ids) => {
      console.log('BloodPressure inserted ', { ids });
    }).catch(e => {
      console.warn('BloodPressure error ', e.message);
    });
    Alert.alert('Info', 'Dados inseridos');

  };

  const readSampleData = () => {
    readRecords('HeartRate', {
      timeRangeFilter: {
        operator: 'between',
        startTime: getLastTwoWeeksDate().toISOString(),
        endTime: getTodayDate().toISOString(),
      },
    }).then((result) => {
      console.log('Retrieved records: ', JSON.stringify({ result }, null, 2));
    });
  };

  const readSampleDataSingle = () => {
    readRecord('Steps', 'a7bdea65-86ce-4eb2-a9ef-a87e6a7d9df2').then(
      (result) => {
        console.log('Retrieved record: ', JSON.stringify({ result }, null, 2));
      },
    );
  };

  const aggregateSampleData = () => {
    aggregateRecord({
      recordType: 'Steps',
      timeRangeFilter: {
        operator: 'between',
        startTime: getLastWeekDate().toISOString(),
        endTime: getTodayDate().toISOString(),
      },
    }).then((result) => {
      console.log('Aggregated record: ', { result });
    });
  };

  const requestSamplePermissions = () => {
    requestPermission([
      {
        accessType: 'read',
        recordType: 'HeartRate',
      },
      {
        accessType: 'write',
        recordType: 'HeartRate',
      },
    ]).then((permissions) => {
      console.log('Granted permissions on request ', { permissions });
    });
  };

  const grantedPermissions = () => {
    getGrantedPermissions().then((permissions) => {
      console.log('Granted permissions ', { permissions });
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Initialize" onPress={initializeHealthConnect} />
      <Button
        title="Open Health Connect settings"
        onPress={openHealthConnectSettings}
      />
      <Button
        title="Open Health Connect data management"
        onPress={() => openHealthConnectDataManagement()}
      />
      <Button title="Check availability" onPress={checkAvailability} />
      <Button
        title="Request sample permissions"
        onPress={requestSamplePermissions}
      />
      <Button title="Get granted permissions" onPress={grantedPermissions} />
      <Button title="Revoke all permissions" onPress={revokeAllPermissions} />
      <Button title="Insert sample data" onPress={insertSampleData} />
      <Button title="Read sample data" onPress={readSampleData} />
      <Button title="Read specific data" onPress={readSampleDataSingle} />
      <Button title="Aggregate sample data" onPress={aggregateSampleData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
