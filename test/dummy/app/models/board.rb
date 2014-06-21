class Board < ActiveRecord::Base
  include NightKnocker::Model

  view_model_attribute :comment, type: :string

  has_one  :category
  has_many :comments
  accepts_nested_attributes_for :category, :comments
end
