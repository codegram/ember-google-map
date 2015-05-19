import Ember from 'ember';
import helpers from 'ember-google-map/core/helpers';
import GoogleMapCoreView from './core';

var computed = Ember.computed;
var alias = computed.alias;
var oneWay = computed.oneWay;
/**
 * @class GoogleMapMarkerView
 * @extends GoogleMapCoreView
 */
export default GoogleMapCoreView.extend({
  googleFQCN: 'google.maps.Marker',
  model:      computed.alias('controller.model'),

  googleProperties: {
    isClickable: {name: 'clickable', event: 'clickable_changed'},
    isVisible:   {name: 'visible', event: 'visible_changed'},
    isDraggable: {name: 'draggable', event: 'draggable_changed'},
    title:       {event: 'title_changed'},
    opacity:     {cast: helpers.cast.number},
    icon:        {event: 'icon_changed'},
    zIndex:      {event: 'zindex_changed', cast: helpers.cast.integer},
    map:         {readOnly: true},
    'lat,lng':   {
      name:       'position',
      event:      'position_changed',
      toGoogle:   helpers._latLngToGoogle,
      fromGoogle: helpers._latLngFromGoogle
    }
  },

  _coreGoogleEvents:      ['click'],

  // aliased from model so that if they are not defined they use the values from the model
  title:                  alias('model.title'),
  opacity:                alias('model.opacity'),
  zIndex:                 alias('model.zIndex'),
  isVisible:              alias('model.isVisible'),
  isDraggable:            alias('model.isDraggable'),
  isClickable:            alias('model.isClickable'),
  icon:                   alias('model.icon'),
  lat:                    alias('model.lat'),
  lng:                    alias('model.lng'),

  // get the info window template name from the component or own model
  infoWindowTemplateName: computed('model.infoWindowTemplateName', 'parentView.markerInfoWindowTemplateName', function () {
    return this.get('model.infoWindowTemplateName') || this.get('parentView.markerInfoWindowTemplateName');
  }).readOnly(),

  infoWindowAnchor: oneWay('googleObject'),

  isInfoWindowVisible: alias('model.isInfoWindowVisible'),

  hasInfoWindow: computed('parentView.markerHasInfoWindow', 'model.hasInfoWindow', function () {
    var fromCtrl = this.get('model.hasInfoWindow');
    if (fromCtrl === null || fromCtrl === undefined) {
      return !!this.get('parentView.markerHasInfoWindow');
    }
    return fromCtrl;
  }).readOnly(),

  /**
   * @inheritDoc
   */
  _handleCoreEvent: function (name) {
    if (name === 'click') {
      this.set('isInfoWindowVisible', true);
    }
  }
});

