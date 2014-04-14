module NightKnocker
  class JsModelGenerator < Rails::Generators::NamedBase
    source_root File.expand_path("../templates", __FILE__)

    def copy_javascript
      template "javascript.js", File.join('app/assets/javascripts', class_path, "#{file_name}.js")
    end
  end
end
