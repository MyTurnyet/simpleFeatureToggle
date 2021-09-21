import {FeatureToggleService, FeatureToggleSetting} from './feature-toggle.service';
import {FakeEnvironmentConfigService} from "../environment-config.service.spec";

describe('FeatureToggleService', () => {
  function hasCorrectValuesForSettings(testFeatureToggleSettings: FeatureToggleSetting[], environmentConfigService: FakeEnvironmentConfigService, expectedVisibleInProd: boolean = true) {
    const featureToggleService = new FeatureToggleService(testFeatureToggleSettings, environmentConfigService);

    const alwaysVisible = featureToggleService.isActive('testFeature');
    const hasNoSettingNeverVisible = featureToggleService.isActive('someFeature');
    const neverVisible = featureToggleService.isActive('testFeatureHidden');
    const onlyVisibleInProduction = featureToggleService.isActive('testOnlyProd');

    expect(alwaysVisible).toEqual(true);
    expect(hasNoSettingNeverVisible).toEqual(false);
    expect(neverVisible).toEqual(false);
    expect(onlyVisibleInProduction).toEqual(expectedVisibleInProd);
  }

  describe('Logic tests', () => {
    const testFeatureToggleSettings: FeatureToggleSetting[] = [
      {
        name: 'testFeature',
        description: 'test on',
        visibility:
          {isActiveInProd: true, isActiveLocally: true}
      }, {
        name: 'testFeatureHidden',
        description: 'test off',
        visibility:
          {isActiveInProd: false, isActiveLocally: false}
      }, {
        name: 'testOnlyProd',
        description: 'test bad',
        visibility:
          {isActiveInProd: true, isActiveLocally: false}
      },
    ];

    it('should return correct values in dev environment', () => {
      let environmentConfigService = new FakeEnvironmentConfigService();
      hasCorrectValuesForSettings(testFeatureToggleSettings, environmentConfigService, false);
    });

    it('should return correct values in production environment', () => {
      let environmentConfigService = new FakeEnvironmentConfigService();
      environmentConfigService.setEnvironmentToProd();
      hasCorrectValuesForSettings(testFeatureToggleSettings, environmentConfigService, true);
    });
  });
});
