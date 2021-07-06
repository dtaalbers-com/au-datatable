import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

function fireEvent(el, type, options) {
  var o = options || {};
  var e = document.createEvent('Event');
  e.initEvent(type, true, true);
  Object.keys(o).forEach(apply);
  el.dispatchEvent(e);
  function apply(key) {
    e[key] = o[key];
  }
}

function delay() {
  return new Promise(resolve => {
    setTimeout(resolve, 20);
  });
}

describe('primaryClick binding behavior', () => {
  let component;

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('sets font color', done => {
    let hitted = false;
    function hit() { hitted = true; }

    let model = {hit};

    component = StageComponent
      .withResources('binding-behaviors/primary-click')
      .inView('<button click.trigger="hit() & primaryClick"></button>')
      .boundTo(model);

    let view;
    component.create(bootstrap).then(() => {
      view = component.element;
      fireEvent(view, 'click', {button: 0});
    }).then(delay).then(() => {
      expect(hitted).toBe(true);
      hitted = false;
      fireEvent(view, 'click', {button: 1});
    }).then(delay).then(() => {
      expect(hitted).toBe(false);
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
