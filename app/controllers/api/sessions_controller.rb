class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  def create
    sp = session_params
    @user = User.find_by_credentials(sp[:email], sp[:password])
    if @user
      @user.reset_session_token!
      session[:session_token] = @user.session_token
      render :show
    else
      render json: ["Invalid credentials."], status: 401
    end
  end

  def destroy
    if current_user.nil?
      render json: ["You are not logged in."], status: 404
      return
    end

    current_user.reset_session_token!
    session[:session_token] = nil
    render json: {}
  end

  def check_email
    user = User.find_by(email: params[:email])
    if user.nil?
      render json: false
    else
      render json: true
    end
  end

  private
  def session_params
    params.require(:user).permit(:email, :password)
  end
end
