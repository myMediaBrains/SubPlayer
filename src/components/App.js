import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import Subtitle from './Subtitle';
import Timeline from './Timeline';
import Player from './Player';
import { debounce } from '../utils';

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    #root {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #ccc;
        background: rgb(16, 17, 19);
    }

    .notice {
        position: fixed;
        z-index: 99;
        top: 10px;
        left: 50%;
        transform: translate(-50%);
        font-size: 13px;
        color: #fff;
        background: #e0271a;
        padding: 7px 20px;
        border-radius: 3px;
    }
`;

const Main = styled.div`
    display: flex;
`;

export default class App extends React.Component {
    state = {
        mainHeight: 100,
        videoUrl: 'https://zhw2590582.github.io/assets-cdn/video/one-more-time-one-more-chance-480p.mp4',
        subtitleUrl: 'https://zhw2590582.github.io/assets-cdn/subtitle/one-more-time-one-more-chance.srt',
        subtitles: [
            {
                $edit: false,
                $highlight: false,
                start: '0:00:01.981',
                end: '0:00:04.682',
                duration: '2.701',
                text: `We're quite content to be the odd browser out.`,
            },
            {
                $edit: false,
                $highlight: false,
                start: '0:00:01.981',
                end: '0:00:04.682',
                duration: '2.701',
                text: `We're quite content to be the odd browser out.`,
            },
            {
                $edit: false,
                $highlight: false,
                start: '0:00:01.981',
                end: '0:00:04.682',
                duration: '2.701',
                text: `We're quite content to be the odd browser out.`,
            },
            {
                $edit: false,
                $highlight: false,
                start: '0:00:01.981',
                end: '0:00:04.682',
                duration: '2.701',
                text: `We're quite content to be the odd browser out.`,
            },
            {
                $edit: false,
                $highlight: false,
                start: '0:00:01.981',
                end: '0:00:04.682',
                duration: '2.701',
                text: `We're quite content to be the odd browser out.`,
            },
            {
                $edit: false,
                $highlight: false,
                start: '0:00:01.981',
                end: '0:00:04.682',
                duration: '2.701',
                text: `We're quite content to be the odd browser out.`,
            },
        ],
    };

    componentDidMount() {
        this.uddateMainHeight();

        const resizeDebounce = debounce(() => {
            this.uddateMainHeight();
        }, 500);

        window.addEventListener('resize', resizeDebounce);
    }

    uddateMainHeight() {
        this.setState({
            mainHeight: document.body.clientHeight - 250,
        });
    }

    removeSubtitle(index) {
        const subtitles = this.state.subtitles.slice();
        subtitles.splice(index, 1);
        this.setState({
            subtitles,
        });
    }

    editSubtitle(index) {
        const subtitles = this.state.subtitles.slice().map(item => {
            item.$edit = false;
            return item;
        });
        subtitles[index].$edit = true;
        this.setState({
            subtitles,
        });
    }

    updateSubtitle(index, subtitle) {
        const subtitles = this.state.subtitles.slice().map(item => {
            item.$edit = false;
            return item;
        });
        subtitles[index] = subtitle;
        this.setState({
            subtitles,
        });
    }

    updateVideoUrl(videoUrl) {
        this.setState({
            videoUrl,
        });
    }

    updateSubtitleUrl(subtitleUrl) {
        this.setState({
            subtitleUrl,
        });
    }

    initSubtitles(subtitles) {
        this.setState({
            subtitles,
        });
    }

    render() {
        return (
            <React.Fragment>
                <GlobalStyle />
                <Header
                    onInitSubtitles={this.initSubtitles.bind(this)}
                    onUpdateSubtitleUrl={this.updateSubtitleUrl.bind(this)}
                    onUpdateVideoUrl={this.updateVideoUrl.bind(this)}
                />
                <Main
                    style={{
                        height: `${this.state.mainHeight}px`,
                    }}
                >
                    <Subtitle
                        subtitles={this.state.subtitles}
                        onEdit={this.editSubtitle.bind(this)}
                        onUpdate={this.updateSubtitle.bind(this)}
                        onRemove={this.removeSubtitle.bind(this)}
                    />
                    <Player videoUrl={this.state.videoUrl} subtitleUrl={this.state.subtitleUrl} />
                </Main>
                <Timeline />
            </React.Fragment>
        );
    }
}
