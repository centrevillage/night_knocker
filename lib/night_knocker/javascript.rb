module NightKnocker
  module Javascript
    extend self

    class ERBContext
      def initialize(vals={})
        vals.each do |k, v|
          instance_variable_set "@#{k}", v
        end
      end
      def get_binding
        return binding()
      end
    end

    def setup
      Rails.logger.info "[DEBUG] NightKnocker::Javascript.setup -call "
      @erb = ERB.new(File.read(File.expand_path('../templates/model.js.erb', __FILE__)))
    end

    def generate_all_view_models
      nik_models = NightKnocker::Model::Env.model_classes
      js = ""
      nik_models.each do |nik_model|
        js << generate_view_model(nik_model)
      end
      js
    end

    def generate_view_model(model_class)
      context = ERBContext.new(model_class: model_class)
      @erb.result(context.get_binding)
    end
  end
end
