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
        if (sp[:start]).present?
          @tournaments = @tournaments.where("start_date >= ?", sp[:start].to_date)
        end

        if sp[:end].present?
          @tournaments = @tournaments.where("end_date <= ?", sp[:end].to_date)
        end

        if sp[:lat_bounds].present?
          @tournaments = @tournaments.where(lat: (sp[:lat_bounds][0]..sp[:lat_bounds][1]))
        end

        if sp[:lng_bounds].present?
          @tournaments = @tournaments.where(lng: (sp[:lng_bounds][0]..sp[:lng_bounds][1]))
        end
      end

      render json: @tournaments
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
      params.require(:search).permit(:start, :end, :lat, :lng, lat_bounds: [], lng_bounds: [])
    end

    def tournament_params
      params.require(:tournament).permit(:name, :organizer_id, :delegate_id, :location, :venue, :start_date, :end_date, :lat, :lng)
    end
  end
end
