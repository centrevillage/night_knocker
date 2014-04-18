require 'rails'

module NightKnocker
  class Railtie < ::Rails::Railtie
    config.to_prepare do
      NightKnocker::Env.setup
    end

  end
end
