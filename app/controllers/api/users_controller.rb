class Api::UsersController < ApplicationController
  # before_action :require_logged_in
  def show
    @user = User.find_by(id: params[:id])
    render :show
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      session[:session_token] = @user.session_token
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.update(user_params)
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :image)
  end
end
