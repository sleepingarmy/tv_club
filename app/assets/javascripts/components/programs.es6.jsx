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

  // componentDidMount () {
  //   $.ajax({
  //     url: '/programs',
  //     type: 'GET'
  //   }).success( data => {
  //     debugger
  //     this.setState({ programs: @programs });
  //   })
  // }

  showAddForm(){
    this.setState({showAdd: !this.state.showAdd });
  }

  addProgramForm(){
    if (this.state.showAdd) {
      return(<div className='main'>
            <p> * indicates required field </p>
            <form onSubmit={this.newProgram}>
              <span> * </span>
              <input placeholder='Program Title' type='text' ref='title' autoFocus='true' /><br />
              <span> * </span>
              <input placeholder='Genre' type='text' ref='genre' /><br />
              <span> * </span>
              <input placeholder='Network' type='dropdown' ref='network' /><br />
              <textarea placeholder='Description' type='text' ref='description' /><br />
              <input placeholder='Number of Seasons' type='number' min='1' max='100' step='1' ref='seasons' /><br />
              <input placeholder='Air Day' type='text' ref='weekday' /><br />
              <button className='btn btn-default' type='submit'> Submit </button>
            </form>
           </div>)
    }
  }

  newProgram () {
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
      this.setState({ programs: data })
    }).error( data => {
      alert(data);
    })
  }

  render () {
    let programs = this.state.programs.map( program => {
      let key = `program-${program.id}`;
      return(<Program key={key} removeProgram={this.removeProgram} editprogram={this.editProgram} {...program} />);
    });
    return(<div>
          <h1 onClick={this.showAddForm}> Add Programs </h1>
          {this.addProgramForm()}
          <div className='container-fluid'>
            <div className='row'>
              <h1 > Programs </h1>
              <form className='search'> 
                <input onChange={this.searchPrograms} type='text' ref='search' placeholder='Title' />
                <button type='submit'> Search </button>
              </form>
            </div>
            <div className='row'>
              <h4 className='col-md-4' onClick={ this.sortByTitle} > Sort by Title </h4>
              <h4 className='col-md-4' onClick={ this.sortByGenre} > Sort by Genre </h4>
              <h4 className='col-md-4' onClick={ this.sortByNetwork} > Sort by Network </h4>
            </div>
            {programs}
          </div>
       </div>);
  }
}

