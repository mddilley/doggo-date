module ApplicationHelper

  def show_navbar
    <<-HTML
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <strong><span class="navbar-brand" >Wagger</span></strong>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#{user_dogs_path(current_user)}">My Dogs<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">My Playdates</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#{user_path(current_user)}">Preferences</a>
            </li>
          </ul>
        </div>
        #{logout_button}
      </nav>
    HTML
  end

  def logout_button
    if logged_in?
      <<-HTML
            <div><a class="btn btn-danger btn-sm" href="#{logout_path}" role="button">Logout</a></div>
      HTML
    end
  end

  def populate_data_list(array)
    string = ""
    string.tap {
      array.each do |d|
        string << "<option value=\"#{d}\">#{d}</option>"
      end
    }
  end

  def data_list(id_tag, array)
    <<-HTML
      <datalist id="#{id_tag}"><select>#{populate_data_list(array)}</select></datalist>
    HTML
  end


end
