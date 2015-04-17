class SessionsController < ApplicationController
  before_action :ensure_logged_out, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login!(@user)
      redirect_to root_url
    else
      @user = User.new(email: params[:user][:email])
      flash.now[:errors] = ["Invalid Credentials"]
      render :new
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil;
    redirect_to new_session_url
  end

  private

  def ensure_logged_out
    if logged_in?
      redirect_to root_url
    end
  end
end
