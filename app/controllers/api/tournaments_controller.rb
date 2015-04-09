module Api
  class Api::TournamentsController < ApiController
    def index
      @tournaments = Tournament.all

      if(search_params)
        if search_params[:start]
          @tournaments = @tournaments.where("start_date >= ?", search_params[:start])
        end

        if search_params[:end]
          @tournaments = @tournaments.where("end_date <= ?", search_params[:end])
        end

        if search_params[:loc] && search_params[:rad]
          resp = RestClient.get("https://maps.googleapis.com/maps/api/geocode/json",
            { params: {
                address: search_params[:loc],
                # key: 'AIzaSyB8pqPpYhPhCttU1OnLJY_qcbFOpWagtZM'
            }
          })
          json = JSON.parse(resp)
          lat = json['results'][0]['geometry']['location']['lat']
          lng = json['results'][0]['geometry']['location']['lng']

          @tournaments = @tournaments.within(search_params[:rad], origin: [lat, lng])
        end
      end

      render json: @tournaments
    end

    def show
      @tournament = Tournament.find(params[:id])
      render :show
    end

    def create
      @tournament = Tournament.new(tournament_params)
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
      params.require(:search).permit(:loc, :start, :end, :rad)
    end

    def tournament_params
      params.require(:tournament).permit(:name, :organizer_id, :delegate_id, :location, :venue, :start_date, :end_date)
    end
  end
end
