import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyB-0QDE47d6mBC6SNtwDxrX-eSOSnfJ5KA';


class App extends React.Component {

    componentDidMount() {
        this.onTermSubmit('music');
    };

    state = { 
        videos: [],
        selectedVideo: null  
    };

    onTermSubmit = async term => {
        console.log(term)
        const response = await youtube.get("/search", {
            params: {
                q: term, 
                part: 'snippet',
                maxResults: 5, 
                type: 'video', 
                key: KEY
            }
        });
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]   
            });
    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    };

    render() {
        return (
            <div className="ui container" style={{ marginTop: '20px' }}>
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column"><VideoList 
                            videos={this.state.videos}
                            onVideoSelect={this.onVideoSelect}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default App; 