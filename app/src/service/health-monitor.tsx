import { getSdkStatus, initialize, requestPermission, SdkAvailabilityStatus } from 'react-native-health-connect';
import BackgroundService from 'react-native-background-actions';

import collectors from './collectors';
import { PermissionsAndroid } from 'react-native';

export interface HealthMonitorConfig {
  bpm: boolean,
  pressao: boolean,
  gps: boolean
}

export class HealthMonitor {

  private _options;
  private _onData: ((data: any) => Promise<void>) | undefined;

  constructor(options?: any) {
    this._options = {
      taskName: 'CuidadoConectado',
      taskTitle: 'Checando sua saúde',
      taskDesc: 'Verifica como está os indicadores de saúde disponíveis',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#ff00ff',
      linkingURI: 'cuidadoConectado://monitor', // Add this
      parameters: {
        interval: 60_000,
      },
      ...options,
    };
  }

  public onCollect(func: (data: any) => Promise<void>) {
    this._onData = func;
    return this;
  }

  public async start(config?: HealthMonitorConfig): Promise<void> {
    const isInitialized = await initialize();
    if (!await this.checkAvailability()) {
      throw new Error('Verifique se o Health Connect está instalado ou atualizado.');
    }
    if (!isInitialized) {
      throw new Error('Não foi possível se conectar com o Health Connect');
    }
    await requestPermission([
      {
        accessType: 'read',
        recordType: 'HeartRate',
      },
      {
        accessType: 'write',
        recordType: 'HeartRate',
      },
      {
        accessType: 'read',
        recordType: 'BloodPressure',
      },
    ]);
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNegative: 'Não',
        buttonPositive: 'OK',
      },
    );

    // TODO check granted permission before start collecting some data
    return BackgroundService.start(this.backgroundTask.bind(this), this._options);
  }

  public stop() {
    return BackgroundService.stop();
  }

  private async checkAvailability() {
    const status = await getSdkStatus();
    if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
      return true;
    }

    if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
      console.log('SDK is not available');
    }

    if (
      status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
    ) {
      console.log('SDK is not available, provider update required');
    }

    return false;
  }

  private async backgroundTask(taskDataArguments: any) {

    const task = async () => {

      // TODO pegar via taskDataArguments quais sao as config dos collectors que devem ser lidos

      console.log(new Date(), HealthMonitor.name, 'collector [started]');
      const results = await Promise.all(Object.values(collectors).map(p => p()));
      console.log(new Date(), HealthMonitor.name, 'collector [finished]');
      if (this._onData) {
        await this._onData(results);
      }
    };

    await task();
    setInterval(task.bind(this), taskDataArguments.interval);
  }
}
