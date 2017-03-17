class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
    render :index
  end

  def show
    @track = Track.find_by(id: params[:id])
    render json: "Can't find track", status: 404 if @track.nil?
    render :show
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render :show
    else
      byebug
      render json: @track.errors.full_messages, status: 422
    end
  end

  def update
    @track = Track.find_by(id: params[:id])
    render json: "Can't find track", status: 404 if @track.nil?
    if @track.save
      render :show
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def destroy
    @track = Track.find_by(id: params[:id])
    render json: "Can't find track", status: 404 if @track.nil?
    @track.destroy
    index
  end

  def track_params
    params[:track][:image] = nil if params[:track][:image] == "null"
    params.require(:track).permit(:artist_id, :title, :image, :music)
  end
end
