module Responder
  extend ActiveSupport::Concern

  def res resources, extra_params = {}
    render extra_params.merge json: resources
  end

  def pagination_dict object
    {
      current_page: object.page,
      next_page: object.next
    }
  end
end
