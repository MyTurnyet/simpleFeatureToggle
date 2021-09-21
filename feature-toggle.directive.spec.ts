import {FeatureToggleDirective} from "./feature-toggle.directive";

import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FeatureToggleService, FeatureToggleSetting} from './feature-toggle.service';
import {featureToggleInjectionToken} from "./feature-toggle-data";
import {By} from "@angular/platform-browser";
import {EnvironmentConfigService} from "../environment-config.service";
import {FakeEnvironmentConfigService} from "../environment-config.service.spec";


@Component({
  template: '<div class="foo">' +
    '<div class="testExistsInProd" featureToggle="featureON">Show Stuff!</div>' +
    '<div class="testDoesntExistInProd" featureToggle="featureOFF">Hide Stuff!</div>' +
    '<div class="testNoToggle" >Always Exists!</div>' +
    '</div>'
})
class TestComponent {
  show = false;
}

const testFeatureToggleSettings: FeatureToggleSetting[] = [
  {
    name: 'featureON',
    description: 'test on',
    visibility:
      {isActiveInProd: true, isActiveLocally: false}
  }, {
    name: 'featureOFF',
    description: 'test off',
    visibility:
      {isActiveInProd: false, isActiveLocally: true}
  }
];

describe('FeatureToggleDirective', () => {
  describe('Html tests', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let environmentConfig = new FakeEnvironmentConfigService();
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [TestComponent, FeatureToggleDirective],
        providers: [
          {provide: featureToggleInjectionToken, useValue: testFeatureToggleSettings},
          {provide: EnvironmentConfigService, useValue: environmentConfig},
          FeatureToggleService,
        ]
      })
        .createComponent(TestComponent);
      component = fixture.componentInstance;
    });
    it('should show the in dev environment', () => {
      fixture.detectChanges();
      const debugElement = fixture.debugElement;
      expect(debugElement.query(By.css('.testExistsInProd'))).toBeFalsy();
      expect(debugElement.query(By.css('.testDoesntExistInProd'))).toBeTruthy();
      expect(debugElement.query(By.css('.testNoToggle'))).toBeTruthy();
    });
    it('should show the correct HTML output', () => {
      environmentConfig.setEnvironmentToProd();
      fixture.detectChanges();
      const debugElement = fixture.debugElement;
      expect(debugElement.query(By.css('.testExistsInProd'))).toBeTruthy();
      expect(debugElement.query(By.css('.testDoesntExistInProd'))).toBeFalsy();
      expect(debugElement.query(By.css('.testNoToggle'))).toBeTruthy();
    });
  });
});
