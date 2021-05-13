module ErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from "Exception" do |exception|
      error_handle exception, :bad_request
    end
  end

  private

  def error_handle error, status = :bad_request
    message = error.to_s.split("::").last.underscore.humanize
    status = error.class.respond_to?(:status_code) ? error.class.status_code : status

    res({ error: { message: message } }, status: status)
  end
end
