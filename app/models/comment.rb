class Comment < ApplicationRecord
  validates :text, :commentable_type, :commentable_id, :commenter_id, presence: true

  belongs_to :commentable, polymorphic: true

  belongs_to :commenter,
    primary_key: :id,
    foreign_key: :commenter_id,
    class_name: :User
end
