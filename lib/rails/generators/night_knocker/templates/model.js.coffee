<% class_name = name.classify -%>
class <%= class_name %> extends NightKnockerModel
  resource_name: <%= name.underscore %>
  constructor: (data) ->
    super(data)

window.<%= class_name %> = <%= class_name %>
