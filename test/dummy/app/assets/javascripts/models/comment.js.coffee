class Comment extends NightKnockerModel
  resource_name: 'comment'
  constructor: (data) ->
    super(data, {observe: true})

window.Comment = Comment
