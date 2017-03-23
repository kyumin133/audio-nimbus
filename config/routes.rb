Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  get 'api/session/email' => 'api/sessions#check_email', :as => :check_email

  namespace :api, default: {format: :json} do
    resources :comments, only: [:index, :show, :create, :update, :destroy]
    resources :tracks, only: [:index, :show, :create, :update, :destroy]
    resources :users, only: [:show, :create, :update]
    resource :session, only: [:create, :destroy]
  end
end
