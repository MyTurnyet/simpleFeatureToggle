import {Inject, Injectable} from '@angular/core';
import {featureToggleInjectionToken} from './feature-toggle-data';
import {EnvironmentConfigService} from "../environment-config.service";


export interface FeatureToggleVisibility {
  isActiveInProd: boolean;
  isActiveLocally: boolean;
}

export interface FeatureToggleSetting {
  name: string;
  description: string;
  visibility: FeatureToggleVisibility;
}

export interface FeatureToggleInterface {
  isActive(featureName: string): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService implements FeatureToggleInterface {

  constructor(
    @Inject(featureToggleInjectionToken) private featureToggleSettings: FeatureToggleSetting[],
    private environmentConfig: EnvironmentConfigService) {
  }

  isActive(featureName: string): boolean {
    let visibility = this.featureToggleSettings
      .find(setting => setting.name === featureName)
      ?.visibility;
    if (this.environmentConfig.isProductionEnvironment()) {
      return visibility?.isActiveInProd ?? false;
    }
    return visibility?.isActiveLocally ?? false;
  }
}
