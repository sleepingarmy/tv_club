class Programs extends React.Component {
  constructor (props) {
    super(props);
    this.state =  { programs: this.props.programs, showAdd: false, sortTitle: true, sortNetwork: false, sortGenre: false }
    this.newProgram = this.newProgram.bind(this);
    this.removeProgram = this.removeProgram.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.addProgramForm = this.addProgramForm.bind(this);
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
              <button type='submit'> Submit </button>
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
      let programs = this.state.programs;
      programs.unshift(data.programs);
      this.refs.title.value = null;
      debugger
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

  sortGenre(){
    let sortColumnName = "genre"
    this.setState({ sortGenre: true, sortTitle: false, sortNetwork: false})

  }

  sortNetwork(){
    this.setState({ sortGenre: false, sortTitle: false, sortNetwork: true})
  }


  render () {
    let programs = this.state.programs.map( program => {
      let key = `program-${program.id}`;
      return(<Program key={key} removeProgram={this.removeProgram} editprogram={this.editProgram} {...program} />);
    });

    return (<div className='main'>
              <h1 onClick={this.showAddForm}> Add Programs </h1>
              {this.addProgramForm()}
              <h1> Programs </h1>
              <p onClick={ this.sortGenre} > sort by genre </p>
              <p onClick={ this.sortNetwork} > sort by network </p>

              {programs}
           </div>);
  }
}

