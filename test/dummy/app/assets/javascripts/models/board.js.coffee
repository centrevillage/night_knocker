class Board extends NightKnockerModel
  resource_name: 'board'
  constructor: (data) ->
    super({}, {observe: true})
    @field('comment', data?.comment)
    @has_one('category_attributes', Category, data?.category, {field: true})
    @has_many('comment_attributes', Comment, data?.comments, {field: true})
    @observable('hoge', 1)
    @observable('piyo', 10, {observe: false})
    @observable('a', 2)
    @observable('b', 3)
    @computed('sum', -> @a() + @b())

window.Board = Board
