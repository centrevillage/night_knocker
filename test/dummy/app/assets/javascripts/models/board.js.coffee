class Board extends NightKnockerModel
  constructor: (data) ->
    super(data, {observe: true})
    @field('hoge', 1)

window.Board = Board
