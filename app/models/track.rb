class Track < ApplicationRecord
  validates :title, :artist_id, presence: true
  belongs_to :user,
    primary_key: :id,
    foreign_key: :artist_id,
    class_name: :User

  has_many :comments,
    as: :commentable,
    dependent: :destroy

  has_attached_file :image, default_url: "assets/track.jpeg"
  has_attached_file :music
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates_attachment_content_type :music, content_type: [ 'audio/mpeg3', 'application/mp3', 'audio/mp3', 'audio/mpeg']
end
