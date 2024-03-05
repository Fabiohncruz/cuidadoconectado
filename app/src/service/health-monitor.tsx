import { getSdkStatus, initialize, requestPermission, SdkAvailabilityStatus } from 'react-native-health-connect';
import BackgroundService from 'react-native-background-actions';

import collectors from './collectors';
import { PermissionsAndroid } from 'react-native';

export class HealthMonitor {

  private _options;

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

  public async start(): Promise<void> {
    const isInitialized = await initialize();
    if (!await this.checkAvailability()) {
      throw new Error('Verifique se o Health Connect está instalado ou atualizado.');
    }
    if (!isInitialized) {
      throw new Error('Não foi possível se conectar com o Health Connect');
    }

    console.log('Solicitando permissões para o health connect');
    await requestPermission([
      {
        accessType: 'read',
        recordType: 'HeartRate',
      },
      {
        accessType: 'write',
        recordType: 'HeartRate',
      },
    ]);

    console.log('Solicitando permissões para o geolocation', 'TODO');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNegative: 'Não',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);

    return BackgroundService.start(this.backgroundTask, this._options);
  }

  public stop() {
    return BackgroundService.stop();
  }

  public isRunning() {
    return BackgroundService.isRunning();
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
      console.log('Running collectors', new Date());
      const results = await Promise.all(collectors.map(p => p()));
      console.log('Collected ', results);
    };
    await task();
    setInterval(task, taskDataArguments.interval);
  }
}
