module NightKnocker
  module Helper
    def escape_tag(text)
      text.html_safe.gsub(%r(</), '<\/')
    end

    def include_night_knocker_core
      javascript_include_tag('night_knocker')
    end

    def include_night_knocker_model(*model_names)
      js = "<script>"
      if model_names.present?
        model_names.each do |model_name|
          js << <<-EOS
            #{ NightKnocker::Javascript.generate_view_model(model_name.classify.constantize) }
          EOS
        end
      else
        js << <<-EOS
          #{ NightKnocker::Javascript.generate_all_view_models }
        EOS
      end
      js << "</script>"
      js.html_safe
    end
  end
end
