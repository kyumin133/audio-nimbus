json.id comment.id
json.text comment.text
json.updatedAt comment.updated_at
json.commentableType comment.commentable_type
json.commentableId comment.commentable_id
json.commenter do
  json.id comment.commenter_id
  json.imageUrl comment.commenter.image.url
  json.username comment.commenter.username
end
