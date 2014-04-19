NightKnockerModel = (function() {
  function NightKnockerModel(attributes) {
    this._options = {};
    if (arguments.length > 1) {
      this._options = arguments[1];
    }
    this.data_keys = [];
    if (this._options['observe']) {
      for (var k in attributes) {
        this.observable(k, attributes[k])
      }
    } else {
      for (var k in attributes) {
        this.field(k, attributes[k])
      }
    }
    this.id = ko.observable(attributes['id']);
    this.errors = ko.observable({});
    this._destroy = ko.observable(false);
    this.reset_errors();
  }

  NightKnockerModel.prototype.is_observe = function(key) {
    return this[key] instanceof Function;
  }

  NightKnockerModel.prototype.observe = function() {
    var keys = this.data_keys;
    if (arguments.length > 0) {
      if (arguments[0] instanceof Array) {
        keys = arguments[0];
      } else {
        keys = [arguments[0]];
      }
    }
    for (var i = 0, len = keys.length; i < len; ++i) {
      var key = keys[i];
      this[key] = ko.observable(ko.unwrap(this[key]));
    }
  }

  NightKnockerModel.prototype.unobserve = function() {
    var keys = this.data_keys;
    if (arguments.length > 0) {
      if (arguments[0] instanceof Array) {
        keys = arguments[0];
      } else {
        keys = [arguments[0]];
      }
    }
    for (var i = 0, len = keys.length; i < len; ++i) {
      var key = keys[i];
      this[key] = ko.unwrap(this[key]);
    }
  }

  NightKnockerModel.prototype.field = function(name, initial_value) {
    this.data_keys.push(name);
    this[name] = initial_value;
  }

  NightKnockerModel.prototype.observable = function(name, initial_value) {
    this.data_keys.push(name);
    if (initial_value instanceof Array) {
      this[name] = ko.observableArray(initial_value);
    } else {
      this[name] = ko.observable(initial_value);
    }
  }

  NightKnockerModel.prototype.set_errors = function(error_data) {
    if (error_data) {
      var errors = $.extend({}, this.errors());
      for (var k in error_data) {
        var v = error_data[k];
        errors[k] = v != null ? v : true;
      }
      return this.errors(errors);
    }
  };

  NightKnockerModel.prototype.reset_errors = function() {
    var  _i, _len, _ref;
    var new_hash = {};
    _ref = this.data_keys;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      var key = _ref[_i];
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
    var errors = $.extend({}, this.errors());
    errors[attr_name] = false;
    return this.errors(errors);
  };

  NightKnockerModel.prototype.to_hash = function() {
    var _i, _len, _ref;
    var data = {};
    data[this.resource_name] = {};
    _ref = this.data_keys;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      var key = _ref[_i];
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
