Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :articles, only: [:index]
      get :article, to: "articles#show"
    end
  end

  get "*path", to: "application#index", constraints: { path: /((?!rails|pack).)*/ }
end
