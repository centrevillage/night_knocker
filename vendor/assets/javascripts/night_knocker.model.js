NightKnockerModel = (function() {
  function NightKnockerModel(attributes) {
    var k, v;
    this.data_keys = [];
    for (k in attributes) {
      this.field(k, attributes[k])
    }
    this.id = ko.observable(attributes['id']);
    this.errors = ko.observable({});
    this._destroy = ko.observable(false);
    this.reset_errors();
  }

  NightKnockerModel.prototype.field = function(name, initial_value) {
    this.data_keys.push(name);
    if (initial_value instanceof Array) {
      this[name] = ko.observableArray(initial_value);
    } else {
      this[name] = ko.observable(initial_value);
    }
  }

  NightKnockerModel.prototype.set_errors = function(error_data) {
    var errors, k, v;
    if (error_data) {
      errors = $.extend({}, this.errors());
      for (k in error_data) {
        v = error_data[k];
        errors[k] = v != null ? v : true;
      }
      return this.errors(errors);
    }
  };

  NightKnockerModel.prototype.reset_errors = function() {
    var key, new_hash, _i, _len, _ref;
    new_hash = {};
    _ref = this.data_keys;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      new_hash[key] = null;
    }
    this.errors(new_hash);
  };

  NightKnockerModel.prototype.error_on = function(attr_name, msg) {
    var errors;
    errors = $.extend({}, this.errors());
    errors[attr_name] = msg != null ? msg : true;
    return this.errors(errors);
  };

  NightKnockerModel.prototype.error_off = function(attr_name) {
    var errors;
    errors = $.extend({}, this.errors());
    errors[attr_name] = false;
    return this.errors(errors);
  };

  NightKnockerModel.prototype.to_hash = function() {
    var data, key, _i, _len, _ref;
    data = {};
    data[this.resource_name] = {};
    _ref = this.data_keys;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      data[this.resource_name][key] = this[key]();
    }
    return ko.mapping.toJS(data);
  };

  NightKnockerModel.prototype.to_create_hash = function() {
    return this.to_hash();
  };

  NightKnockerModel.prototype.to_update_hash = function() {
    if (this._destroy()) {
      return $.extend({ _destroy: this._destroy() }, this.to_hash());
    } else {
      return this.to_hash();
    }
  };

  NightKnockerModel.prototype.create = function(callbacks) {
    this.reset_errors();
    $.ajax(this.resources_url(), {
      method: 'post',
      dataType: 'json',
      data: ko.mapping.toJSON(this.to_create_hash()),
      contentType: "application/json",
      success: (function(_this) {
        return function(data) {
          if (callbacks && callbacks['success']) {
            callbacks['success']();
          }
        };
      })(this),
      error: (function(_this) {
        return function(xhr, status, error) {
          var ex, res, _ref;
          try {
            res = JSON.parse(xhr.responseText);
            _this.set_errors(res != null ? (_ref = res.errors) != null ? _ref.data : void 0 : void 0);
            if (callbacks && callbacks['error']) {
              callbacks['error']();
            }
          } catch (_error) {
            ex = _error;
          }
        };
      })(this),
      complete: (function(_this) {
        return function(xhr, status, error) {
          if (callbacks && callbacks['complete']) {
            callbacks['complete']();
          }
        };
      })(this)
    });
  };

  NightKnockerModel.prototype.update = function(callbacks) {
    this.reset_errors();
    $.ajax(this.resource_url(), {
      method: 'put',
      dataType: 'json',
      data: ko.mapping.toJSON(this.to_update_hash()),
      contentType: "application/json",
      success: (function(_this) {
        return function(data) {
          if (callbacks && callbacks['success']) {
            callbacks['success']();
          }
        };
      })(this),
      error: (function(_this) {
        return function(xhr, status, error) {
          var ex, res, _ref;
          try {
            res = JSON.parse(xhr.responseText);
            _this.set_errors(res != null ? (_ref = res.errors) != null ? _ref.data : void 0 : void 0);
            if (callbacks && callbacks['error']) {
              callbacks['error']();
            }
          } catch (_error) {
            ex = _error;
          }
        };
      })(this),
      complete: (function(_this) {
        return function(xhr, status, error) {
          if (callbacks && callbacks['complete']) {
            callbacks['complete']();
          }
        };
      })(this)
    });
  };

  NightKnockerModel.prototype.destroy = function(callbacks) {
    this.reset_errors();
    $.ajax(this.resource_url(), {
      method: 'delete',
      dataType: 'json',
      success: (function(_this) {
        return function(data) {
          if (callbacks && callbacks['success']) {
            callbacks['success']();
          }
        };
      })(this),
      error: (function(_this) {
        return function(xhr, status, error) {
          var ex, res, _ref;
          try {
            res = JSON.parse(xhr.responseText);
            _this.set_errors(res != null ? (_ref = res.errors) != null ? _ref.data : void 0 : void 0);
            if (callbacks && callbacks['error']) {
              callbacks['error']();
            }
          } catch (_error) {
            ex = _error;
          }
        };
      })(this),
      complete: (function(_this) {
        return function(xhr, status, error) {
          if (callbacks && callbacks['complete']) {
            callbacks['complete']();
          }
        };
      })(this)
    });
  };

  NightKnockerModel.prototype.resource_url = function() {
    return '/' + this.resource_name + '/' + this.id();
  };

  NightKnockerModel.prototype.resources_url = function() {
    return '/' + this.resource_name.pluralize();
  };

  return NightKnockerModel;

})();
