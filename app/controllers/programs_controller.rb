class ProgramsController < ApplicationController

   def index
    @programs = Program.all
    # query = "%%"
    # @results = Program.find_by_sql(["SELECT * FROM programs p WHERE lower(p.title) LIKE ? ", query ])
    render json: @programs
  end

  # def show
  #   @program = Program.find(params[:id])
  # end

  # def new
  #   @program = Program.new
  # end

  def create
    @program = Program.new(program_params)
    if @program.save
      flash[:message] = "program created successfully!"
      render json: Program.all
    else
      flash[:error] =  "Unable to create program. Make sure to include all required fields."
      render json: Program.all
    end
  end

  # def edit
  #   @program = Program.find(params[:id])
  # end

  def update
    @program = Program.find(params[:id])
    @program.update(program_params)
    render json: @program
  end

  def destroy
    Program.find(params[:id]).destroy
    render json: Program.all
  end


  private

  def program_params
    params.require(:program).permit(:title, :description, :genre, :num_of_seasons, :rating, :weekday, :network)
  end

end
