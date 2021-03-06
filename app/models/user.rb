class User < ApplicationRecord
  has_secure_password

  has_many :dogs
  has_many :play_dates, through: :dogs
  # has_many :my_play_dates, :class_name => "PlayDate"

  accepts_nested_attributes_for :dogs, allow_destroy: true,
  reject_if: :all_blank

  validates :name, presence: true
  validates :password, presence: true, :if => :password
  validates :password, length: {in: 5..10}, :if => :password
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

end
