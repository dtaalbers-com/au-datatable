import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('color attribute', () => {
  let component;

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('sets font color', done => {
    let model = {color: 'green'};

    component = StageComponent
      .withResources('attributes/color')
      .inView('<p color.bind="color"></p>')
      .boundTo(model);

    component.create(bootstrap).then(() => {
      const view = component.element;
      expect(view.style.color).toBe('green');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
