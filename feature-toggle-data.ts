import {FeatureToggleSetting} from './feature-toggle.service';
import {InjectionToken} from '@angular/core';

export const FAKE_INDUSTRY_DATA: string = 'Fake Industry Data'
export const featureToggleInjectionToken = new InjectionToken('featureToggleInjectionToken');

export const currentFeatureToggles: FeatureToggleSetting[] =
  [
    {
      name: FAKE_INDUSTRY_DATA,
      description: 'This will return fake industry data until the endpoint is ready',
      visibility:
        {
          isActiveInProd: false,
          isActiveLocally: false
        }
    }
  ];
