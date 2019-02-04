module DogsHelper

  def breeds_for_select
    url = "https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dogs.json"
    @breed ||= JSON.parse(open(url).read)["dogs"]
  end

end