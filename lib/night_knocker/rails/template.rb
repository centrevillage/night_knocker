require 'tilt'

module NightKnocker 
  module Rails
    class NightKnockerJsTemplate < ::Tilt::Template
      self.default_mime_type = 'application/javascript'

      def prepare
      end

      def evaluate(scope, locals, &block)
        nik_models = NightKnocker::Model::Env.model_classes
        output = "#{data}\n"
        nik_models.each do |nik_model|
          output << <<-EOS
            #{nik_model}
          EOS
          nik_model.each_view_model_attributes do |attr_name, options|
            output << <<-EOS
              #{attr_name}: #{options}
            EOS
          end
        end
        output
      end
    end
  end
end
