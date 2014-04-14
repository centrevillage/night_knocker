module NightKnocker
  module Helper
    def escape_tag(text)
      text.html_safe.gsub(%r(</), '<\/')
    end
  end
end
