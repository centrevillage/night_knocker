module NightKnocker
  class JsModelGenerator < Rails::Generators::NamedBase
    source_root File.expand_path("../templates", __FILE__)

    def copy_coffeescript
      template "model.js.coffee", File.join('app/assets/javascripts/models', class_path, "#{file_name}.js.coffee")
    end
  end
end
