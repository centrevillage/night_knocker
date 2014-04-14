module NightKnocker
  module Model
    extend ActiveSupport::Concern

    module Env
      extend self

      def add_model_class(klass)
        @model_classes ||= []
        @model_classes << klass
        @model_classes.uniq!
      end

      def model_classes
        @model_classes.dup
      end
    end

    included do
      NightKnocker::Model::Env.add_model_class self

      class_eval do
        class_attribute :_view_model_attributes
      end
    end

    def error_json
      {errors: {messages: error_messages, data: error_hash}}
    end

    def error_messages
      errors.full_messages
    end

    def error_hash
      errors.to_hash
    end

    module ClassMethods
      def view_model_attribute(name, options={})
        self._view_model_attributes ||= {}
        options = options.with_indifferent_access
        options[:type] = :string unless options[:type]
        self._view_model_attributes[name] = {type: "NightKnocker::AttributeTypes::#{options[:type].to_s.classify}Type".constantize, array: !!options[:array]}
      end

      def each_view_model_attributes
        self._view_model_attributes.each do |k, v|
          yield k, v
        end
      end
    end
  end
end
