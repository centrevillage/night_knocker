require 'rails'

module NightKnocker
  class Railtie < ::Rails::Railtie
    config.before_initialize do |app|
      config.assets.precompile += %w(night_knocker.js)
    end

    config.to_prepare do
      NightKnocker::Env.setup
    end

  end
end
