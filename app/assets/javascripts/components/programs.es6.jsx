class Programs extends React.Component {
  constructor (props) {
    super(props);
    this.state =  { programs: this.props.programs, showAdd: false }
    this.newProgram = this.newProgram.bind(this);
    this.removeProgram = this.removeProgram.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.addProgramForm = this.addProgramForm.bind(this);
    this.sortByGenre = this.sortByGenre.bind(this);
    this.sortByNetwork = this.sortByNetwork.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.searchPrograms = this.searchPrograms.bind(this);
  }

  showAddForm(){
    this.setState({showAdd: !this.state.showAdd });
  }

  addProgramForm(){
    if (this.state.showAdd) {
      return(<div className='row'>
              <form onSubmit={this.newProgram}>
                  <div className='col'>
                    <p> * Indicates Required Field </p>
                    <label> *Program Title </label><br />
                    <input type='text' ref='title' autoFocus='true' /><br />
                    <label> *Genre </label><br />
                    <input type='text' ref='genre' /><br />
                    <label> *Network </label><br />
                    <input type='text' ref='network' /><br />
                    <label> Description </label><br />
                    <textarea className='materialize-textarea' type='text' ref='description' /><br />
                    <label> Air Day </label><br />
                    <input type='text' ref='weekday' /><br />
                    <label> Seasons </label><br />
                    <input type='number' min='1' max='100' step='1' ref='seasons' /><br />
                    <button className='btn' type='submit'> Submit </button>
                  </div>
              </form>
           </div>);
    }
  }

  newProgram(){
    $.ajax({
      url: '/programs',
      type: 'POST',
      data: {program: {title: this.refs.title.value, description: this.refs.description.value, genre: this.refs.genre.value, network: this.refs.network.value, num_of_seasons: this.refs.seasons.value, weekday: this.refs.weekday.value}}
    }).success( data => {
      this.setState({ programs: programs })
    }).error( data => {
      console.log('error');
    });
  }

  removeProgram (id) {
    $.ajax({
      url: '/programs/' + id,
      type: 'DELETE'
    }).success( data => {
      alert('program removed!');
      this.setState({ programs: data});
    }).error( data => {
      alert('not working');
    })
  }

  editProgram (id) {
    $.ajax({
      url: '/programs/' + id,
      type: 'PUT'
    }).success( data => {
      alert('it worked!');
    }).error( data => {
      alert('blurg!');
    })
  }

  sortByGenre(e){
    e.preventDefault();
    $.ajax({
      url: '/programs/by_genre',
      type: 'GET'
    }).success( data => {
      this.setState({ programs: data })
    })
  }

  sortByNetwork(e){
    e.preventDefault();
    $.ajax({
      url: '/programs/by_network',
      type: 'GET'
    }).success( data => {
      this.setState({ programs: data })
    })
  }

  sortByTitle(e){
    e.preventDefault();
    $.ajax({
      url: '/programs/by_title',
      type: 'GET'
    }).success( data => {
      this.setState({ programs: data })
    })
  }

  searchPrograms(e){
    e.preventDefault();
    $.ajax({
      url: '/programs/search',
      type: 'GET',
      data: {search_term: this.refs.search.value}
    }).success( data => {
      if (data.length == 0) {
        this.setState({ programs: false })
      } else {
        this.setState({ programs: data })
      };
    }).error( data => {
      alert('error');
    })
  }

  render () {
    if (this.state.programs) {
      let programs = this.state.programs.map( program => {
        let key = `program-${program.id}`;
        return(<Program key={key} removeProgram={this.removeProgram} editprogram={this.editProgram} {...program} />);
      });
      return(<div>
              <div className='container'>
                <div className='row'>
                    <form className='search'> 
                      <input onChange={this.searchPrograms} placeholder='Search Our Shows' type='text' ref='search' />
                    </form>
                </div>
                <div className='row'>
                  <div className='col'>
                    <h1 onClick={this.showAddForm}> Add Programs </h1>
                    {this.addProgramForm()}
                  </div>
                </div>
              </div>
              <div className='row center'>
                <h1> Programs </h1>
              </div>  
              <div className='row center'>
                <h4 onClick={ this.sortByTitle} > Sort by Title </h4>
                <h4 onClick={ this.sortByGenre} > Sort by Genre </h4>
                <h4 onClick={ this.sortByNetwork} > Sort by Network </h4>
              </div>
              {programs}
           </div>)
    } else {
      return(<div>

              <div className='container'>
                <div className='row'>
                    <form className='search'> 
                      <input onChange={this.searchPrograms} placeholder='Search Our Shows' type='text' ref='search' />
                    </form>
                </div>
                <div className='row'>
                  <div className='col'>
                    <h1 onClick={this.showAddForm}> Add Programs </h1>
                    {this.addProgramForm()}
                  </div>
                </div>
              </div>

              <div className='row center'>
                <h1> Programs </h1>
              </div>  
              <div className='row'>
                <p> Oh no!  It looks like we don't have the program you're looking for. </p>
                <p> To get it added to the database, contact us! </p>
              </div>

           </div>)
    };
  }
}

