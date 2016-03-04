class Episodes extends React.Component {
  constructor(props){
    super(props);
    this.state = { episodes: this.props.episodes, showNewForm: false };
    this.showNewForm = this.showNewForm.bind(this);
    this.newEpisode = this.newEpisode.bind(this);
    this.newEpisodeForm = this.newEpisodeForm.bind(this);
  }

  showNewForm(){
    this.setState({ showNewForm: !this.state.showNewForm });
  }

  newEpisodeForm(){
    if ( this.state.showNewForm) {
      return(<div>
            <form onSubmit={this.newEpisode}>
              <input type='number' placeholder='episode number' ref='episode_number'/>
              <input type='number' placeholder='season number' ref='season_number'/>
              <input type='text' placeholder='summary' ref='summary'/>
              <input type='date' placeholder='air_date' ref='air_date'/>
              <input type='number' placeholder='rating' ref='rating'/>
              <input type='text' placeholder='program' ref='program'/>
              <button type='submit'> submit </button>
            </form>
          </div>)};
  }

  newEpisode(){
    debugger
  }

  render () {
    let episodes = this.state.episodes.map( episode => {
      let key = `episode=${episode.id}`;
      return(<Episode key={key} {...episodes}/>);
    });

    return (<div>
              <h1 onClick={this.showNewForm}> Add Episode </h1>
              {this.newEpisodeForm()}
              {episodes}
            </div>);
  }
}

