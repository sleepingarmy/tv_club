class EpisodesController < ApplicationController

  def index
    @episodes = Episode.all.order(:id)
  end

  def show
    @episode = Episode.find(params[:id])
  end

  def new
    @episode = Episode.new
  end

  def create
    @episode = Episode.new(episode_params)
    binding.pry
    @episode.network_id = Program.where(title: params[:network]).id 
    if @episode.save
      flash[:message] = "episode created successfully!"
      render json: Episode.all
    else
      flash[:error] =  "Unable to create episode. Make sure to include all required fields."
      render json: Episode.all
    end
  end

  def edit
    @episode = Episode.find(params[:id])
  end

  def update
    if @episode.save
      flash[:message] = "episode updated successfully!"
      redirect_to episodes_path
    else
      flash[:message] = "Unable to save changes, please try again."
      render :edit
    end
  end

  def destroy
    Episode.find(params[:id])
    redirect_to episodes_path
  end

  private

  def episode_params
    params.require(:episode).permit(:season, :episode_number, :summary, :air_date, :rating, :program_id)
  end

end
