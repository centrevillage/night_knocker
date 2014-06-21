class BoardsController < ApplicationController
  before_action :set_board, only: [:show, :edit, :update, :destroy]

  # GET /boards
  def index
    @boards = Board.all
    respond_to do |format|
      format.json {render json: @boards}
      format.html {render}
    end
  end

  # GET /boards/1
  def show
    respond_to do |format|
      format.json {render json: @board}
    end
  end

  # GET /boards/new
  def new
    @board = Board.new
    respond_to do |format|
      format.json {render json: @board}
    end
  end

  # GET /boards/1/edit
  def edit
    @board = Board.find(params[:id])
    respond_to do |format|
      format.json {render json: @board}
    end
  end

  # POST /boards
  def create
    @board = Board.new(board_params)

    if @board.save
      redirect_to @board, notice: 'Board was successfully created.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /boards/1
  def update
    if @board.update(board_params)
      redirect_to @board, notice: 'Board was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /boards/1
  def destroy
    @board.destroy
    redirect_to boards_url, notice: 'Board was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_board
      @board = Board.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def board_params
      params.require(:board).permit([:comment, :comments, :comment_attributes, :category, :category_attributes])
    end
end
