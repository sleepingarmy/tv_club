class Program extends React.Component {

  constructor (props) {
    super(props);
    this.state = { edit: false }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  toggleEdit(){
    this.setState({edit: !this.state.edit});
  }

  updateItem(id){
    $.ajax({
      url: '/programs/' + id,
      type: 'PUT',
      data: {program: {title: this.refs.title.value, description: this.refs.description.value, genre: this.refs.genre.value, network: this.refs.network.value, num_of_seasons: this.refs.seasons.value, weekday: this.refs.weekday.value}} 
    }).success( data => {
      this.setState({ edit: false });
    }).error( data => {
      alert(data);
    })
  }

  render () {
    if (this.state.edit){
      return (<div className='program-box'>
                <p> * indicates required field </p>
                <form onSubmit={this.updateItem.bind(this, this.props.id)}>
                <span> * </span>
                  <input autoFocus={true} type='text' defaultValue={this.props.title} ref='title' /><br />
                  <span> * </span>
                  <input type='text' placeholder='Genre' defaultValue={this.props.genre} ref='genre' /><br />
                  <span> * </span>
                  <input type='text' placeholder='Network' defaultValue={this.props.network} ref='network' /><br />
                  <textarea type='text' placeholder='description' defaultValue={this.props.description} ref='description' /><br />
                  <input type='number' placeholder='Seasons' defaultValue={this.props.seasons} ref='seasons' /><br />
                  <input type='text' placeholder='Air Day' defaultValue={this.props.weekday} ref='weekday' /><br />
                  <button type='submit'> Submit </button>
                </form>
                <a onClick={this.toggleEdit}>Cancel</a>
              </div>);
    } else {
      return(<div className='program-box'>
             <h4><b> {this.props.title} </b></h4>
             <h5 className='program-genre'> {this.props.genre} </h5>
             <h5 className='program-network'> {this.props.network} </h5>
             <p className='program-desc'> {this.props.description} </p>
             <a onClick={() => this.props.removeProgram(this.props.id)}><em>Remove Program</em></a><br />
             <a onClick={this.toggleEdit}><em>Edit Program</em></a>

           </div>);
  }
  }
}

