class User < ApplicationRecord
  validates :username, :email, :session_token, uniqueness: true, presence: true
  has_many :tracks,
    primary_key: :id,
    foreign_key: :artist_id,
    class_name: :Track

  has_many :comments,
    as: :commentable,
    dependent: :destroy

  has_attached_file :image, default_url: "assets/dog.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token, :default_username
  after_save :get_dominant_colors!

  attr_reader :password

  def default_username
    self.username ||= self.email
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

end
