<% class_name = name.classify -%>
class <%= class_name %> extends Nk<%= class_name %>
  constructor: (data) ->
    super(data)

window.<%= class_name %> = <%= class_name %>
