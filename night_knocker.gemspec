$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "night_knocker/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "night_knocker"
  s.version     = NightKnocker::VERSION
  s.authors     = ["centrevillage"]
  s.email       = ["centrevillage@gmail.com"]
  s.homepage    = ""
  s.summary     = "Summary of NightKnocker."
  s.description = "Description of NightKnocker."
  s.files = Dir["{lib,vendor}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails"
  s.add_dependency "railties"

  s.add_dependency "jquery-rails"

  s.add_development_dependency "sqlite3"
end
