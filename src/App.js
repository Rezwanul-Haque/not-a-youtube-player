import React from 'react';
import { Grid } from "@material-ui/core";

import { SearchBar, VideoDetail, VideoList } from "./components";
import youtube from "./api/youtube";

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit("Unity of the Muslim Ummah");
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: process.env.YOUTUBE_APP_API_KEY,
                q: searchTerm,
            }
        });
        // console.log('response: ', response.data.items);
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    }

    onVideoSelect = (video) => {
        // console.log('video: ', video);
        this.setState({ selectedVideo: video });
    }
    

    render() {
        const { selectedVideo, videos } = this.state;

        return (
            <Grid justify="center" container spacing={10}>
                <Grid item xs={11}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            {/* SEARCH BAR */}
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>

                        <Grid item xs={8}>
                            {/* VIDEO DETAILS */}
                            <VideoDetail video={selectedVideo} />
                        </Grid>

                        <Grid item xs={4}>
                            {/* VIDEO LISTS */}
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default App;