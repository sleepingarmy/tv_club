class ProgramsController < ApplicationController

   def index
    @programs = Program.all.order(:title)
    @network_numbers = Program.group(:network).count
  end

  def by_title
    @programs = Program.all.order(:title)
    render json: @programs
  end

  def by_genre
    @programs = Program.all.order(:genre)
    render json: @programs
  end

  def by_network
    @programs = Program.all.order(:network)
    render json: @programs
  end

  def show
    @program = Program.find(params[:id])
  end

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

  def search
    # query = "%%"
    # @results = Program.find_by_sql(["SELECT * FROM programs p WHERE lower(p.title) LIKE ? ", query ])
    # binding.pry
    # @programs = Program.find_by_sql(["SELECT * FROM programs p WHERE lower(p.title) LIKE ? ", query ])
    search_term = params[:search_term]
    query = "%#{search_term}%"
    @results = Program.find_by_sql(["SELECT * FROM programs p WHERE lower(p.title) LIKE ? ", query ])
    render json: @results
  end


  private

  def program_params
    params.require(:program).permit(:title, :genre, :network, :description, :num_of_seasons, :rating, :weekday)
  end

end
