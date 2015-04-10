module Api
  class Api::TournamentsController < ApiController
    def index
      if search_params[:center].present? && !search_params[:rad].present?
        @tournaments = Tournament.by_distance(origin: search_params[:center])
      else
        @tournaments = Tournament.all.order(:start_date)
      end

      if search_params
        if (search_params[:start]).present?
          @tournaments = @tournaments.where("start_date >= ?", search_params[:start].to_date)
        end

        if search_params[:end].present?
          @tournaments = @tournaments.where("end_date <= ?", search_params[:end].to_date)
        end

        if search_params[:center].present? && search_params[:rad].present?
          @tournaments = @tournaments.within(search_params[:rad], origin: search_params[:center])
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
      params.require(:search).permit(:start, :end, :rad, :center => [])
    end

    def tournament_params
      params.require(:tournament).permit(:name, :organizer_id, :delegate_id, :location, :venue, :start_date, :end_date, :lat, :lng)
    end
  end
end
