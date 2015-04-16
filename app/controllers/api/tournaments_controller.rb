module Api
  class Api::TournamentsController < ApiController
    before_action :ensure_logged_in, only: [ :create ]

    def index
      sp = search_params

      if sp[:lat].present? && sp[:lng].present?
        center = [sp[:lat], sp[:lng]]
      end

      if center
        @tournaments = Tournament.by_distance(origin: center)
      else
        @tournaments = Tournament.all.order(:start_date)
      end

      if sp
        if (sp[:start_date]).present?
          @tournaments = @tournaments.where("start_date >= ?", Date.strptime(sp[:start_date], '%m-%d-%Y'))
        end

        if sp[:end_date].present?
          @tournaments = @tournaments.where("end_date <= ?", Date.strptime(sp[:end_date], '%m-%d-%Y'))
        end

        if sp[:lat_bounds].present?
          @tournaments = @tournaments.where(lat: (sp[:lat_bounds][0]..sp[:lat_bounds][1]))
        end

        if sp[:lng_bounds].present?
          left_bound = sp[:lng_bounds][0].to_f
          right_bound = sp[:lng_bounds][1].to_f
          if left_bound > right_bound
            @tournaments = @tournaments.where("lng >= ? OR lng <= ?", left_bound, right_bound)
          else
            @tournaments = @tournaments.where(lng: (sp[:lng_bounds][0]..sp[:lng_bounds][1]))
          end
        end
      end
      @tournaments = @tournaments.includes(:organizer, :delegate)
      # render json: @tournaments
      render :index
    end

    def show
      @tournament = Tournament.find(params[:id])
      render :show
    end

    def create
      @tournament = current_user.organized_tournaments.new(tournament_params)
      if @tournament.save
        render json: @tournament
      else
        render json: @tournament.errors.full_messages, status: 422
      end
    end

    def update

    end

    def destroy
    end

    private

    def search_params
      params.require(:search).permit(:start_date, :end_date, :lat, :lng, lat_bounds: [], lng_bounds: [])
    end

    def tournament_params
      params.require(:tournament).permit(:name, :organizer_id, :delegate_id, :location, :venue, :start_date, :end_date, :lat, :lng, :description, :price)
    end
  end
end
