class NetworksController < ApplicationController

  def index
    @networks = Network.all
  end

  def show
    @network = Network.find(params[:id])
  end

  def new
    @network = Network.new
  end

  def create
    @network = Network.new(network_params)
    if @network.save
      flash[:message] = "Network created successfully!"
      redirect_to networks_path
    else
      flash[:error] =  "Unable to create network, please try again"
      render :new
    end
  end

  def edit
    @network = Network.find(params[:id])
  end

  def update
    if @network.save
      flash[:message] = "Network updated successfully!"
      redirect_to networks_path
    else
      flash[:message] = "Unable to save changes, please try again."
      render :edit
  end

  def destroy
    Network.find(params[:id])
    redirect_to networks_path
  end

  private

  def network_params
    params.require(:network).permit(:name)
  end

end
