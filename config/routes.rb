Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :articles, only: :index
    end
  end

  get "*path", to: "application#index", constraints: { path: /((?!rails|pack).)*/ }
end
