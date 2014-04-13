module NightKnocker
  module Support
    def error_json(obj)
      {errors: {messages: obj.errors.full_messages, data: obj.errors.to_hash}}
    end
  end
end
