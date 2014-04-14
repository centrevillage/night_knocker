class NightKnockerModel
  constructor: (attributes) ->
    @data_keys = (k for k, v of attributes)
    for k, v of attributes
      if v instanceof Array
        this[k] = ko.observableArray(v)
      else
        this[k] = ko.observable(v)
    @errors = ko.observable({})
    @reset_errors()

  set_errors: (error_data) ->
    if error_data
      errors = $.extend({}, @errors())
      for k, v of error_data
        errors[k] = v ? true
      @errors(errors)

  reset_errors: ->
    new_hash = {}
    for key in @data_keys
      new_hash[key] = null
    @errors(new_hash)
    return

  error_on: (attr_name, msg) ->
    errors = $.extend({}, @errors())
    errors[attr_name] = msg ? true
    @errors(errors)

  error_off: (attr_name) ->
    errors = $.extend({}, @errors())
    errors[attr_name] = false
    @errors(errors)

  to_hash: ->
    data = {}
    data[@resource_name] = {}
    for key in @data_keys
      data[@resource_name][key] = this[key]()
    ko.mapping.toJS(data)

  to_create_hash: -> @to_hash()
  to_update_hash: -> @to_hash()

  create: (callbacks) ->
    @reset_errors()
    $.ajax(@resources_url(), {
      method: 'post', dataType: 'json',
      data: ko.mapping.toJSON(@to_create_hash()),
      contentType: "application/json",
      success: (data) =>
        if callbacks && callbacks['success']
          callbacks['success']()
        return
      error: (xhr, status, error) =>
        try
          res = JSON.parse(xhr.responseText)
          @set_errors res?.errors?.data
          if (callbacks && callbacks['error'])
            callbacks['error']()
        catch ex
        return
      complete: (xhr, status, error) =>
        if callbacks && callbacks['complete']
          callbacks['complete']()
        return
    })
    return

  update: (callbacks) ->
    @reset_errors()
    $.ajax(@resource_url(), {
      method: 'put', dataType: 'json',
      data: ko.mapping.toJSON(@to_update_hash()),
      contentType: "application/json",
      success: (data) =>
        if callbacks && callbacks['success']
          callbacks['success']()
        return
      error: (xhr, status, error) =>
        try
          res = JSON.parse(xhr.responseText)
          @set_errors res?.errors?.data
          if (callbacks && callbacks['error'])
            callbacks['error']()
        catch ex
        return
      complete: (xhr, status, error) =>
        if callbacks && callbacks['complete']
          callbacks['complete']()
        return
    })
    return

  destroy: (callbacks) ->
    @reset_errors()
    $.ajax(@resource_url(), {
      method: 'delete', dataType: 'json',
      success: (data) =>
        if callbacks && callbacks['success']
          callbacks['success']()
        return
      error: (xhr, status, error) =>
        try
          res = JSON.parse(xhr.responseText)
          @set_errors res?.errors?.data
          if (callbacks && callbacks['error'])
            callbacks['error']()
        catch ex
        return
      complete: (xhr, status, error) =>
        if callbacks && callbacks['complete']
          callbacks['complete']()
        return
    })
    return

window.NightKnockerModel = NightKnockerModel
