class Board < ActiveRecord::Base
  include NightKnocker::Model

  view_model_attribute :comment, type: :string
end
