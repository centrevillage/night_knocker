class Board extends NightKnockerModel
  resource_name: 'board'
  constructor: (data) ->
    super(data, {observe: true})
    @field('hoge', 1)
    @field('piyo', 10, {observe: false})
    @observable('a', 2)
    @observable('b', 3)
    @computed('sum', -> @a() + @b())

window.Board = Board
