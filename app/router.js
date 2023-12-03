import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('report', function() {
    this.route('homepage');
    this.route('patient');
    this.route('reaction');
    this.route('all-treatments');
    this.route('treatment');
    this.route('reporter');
    this.route('finalCheck');
    this.route('reportSent');
  });
  this.route('reports');
});

export default Router;
