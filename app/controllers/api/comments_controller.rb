class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.where("commentable_type = '#{params[:commentable_type]}' AND commentable_id = #{params[:commentable_id]}").order("updated_at DESC").includes(:commenter)
    render :index
  end

  def show
    @comment = Comment.find_by(id: params[:id])
    render json: "Can't find comment", status: 404 if @comment.nil?
    render :show
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update
    @comment = Comment.find_by(id: params[:id])
    render json: "Can't find comment", status: 404 if @comment.nil?
    # byebug

    if @comment.update(comment_params)
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    render json: "Can't find comment", status: 404 if @comment.nil?
    @comment.destroy
    index
  end

  def comment_params
    params.require(:comment).permit(:text, :commentable_type, :commentable_id, :commenter_id)
  end
end
