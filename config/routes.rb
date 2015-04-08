Rails.application.routes.draw do
  root to: 'static_pages#search'

  resources :users
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :tournaments, only: [:index, :show, :create, :update, :destroy]
  end
end
