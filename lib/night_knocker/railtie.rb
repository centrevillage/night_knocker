require 'rails'

module NightKnocker
  class Railtie < ::Rails::Railtie
    rake_tasks do
      load "night_knocker/railties/js_gen.rake"
    end
    config.before_initialize do |app|
      require 'night_knocker'
      require 'sprockets'
      require 'sprockets/engines'
      Sprockets.register_engine '.nik', NightKnocker::Rails::NightKnockerJsTemplate
    end
  end
end
