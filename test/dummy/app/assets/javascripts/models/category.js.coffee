class Category extends NightKnockerModel
  resource_name: 'category'
  constructor: (data) ->
    super({}, {observe: true})
    @field('name', data?.name)

window.Category = Category
