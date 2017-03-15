class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?



  def require_logged_in
    unless logged_in?
      redirect_to root_url
    end
  end

  def require_not_logged_in
    if logged_in?
    end
  end

  def logged_in?
    session[:session_token] ? true : false
  end

  def current_user
    User.find_by(session_token: session[:session_token])
  end
end
