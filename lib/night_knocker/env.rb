module NightKnocker
  module Env
    extend self

    def setup
      NightKnocker::Javascript.setup
    end
  end
end
