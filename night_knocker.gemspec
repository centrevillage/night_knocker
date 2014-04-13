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

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.0.2"

  s.add_development_dependency "sqlite3"
end
