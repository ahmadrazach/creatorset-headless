/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaPause, FaPlay } from "react-icons/fa";
import { MantineTheme } from "@mantine/core";
import { WaveformContianer, Wave, PlayButton } from "./Webform.styled";

interface WaveformProps {
    url: string;
    theme: MantineTheme;
}

interface WaveformState {
    playing: boolean;
}

class Waveform extends Component<WaveformProps, WaveformState> {
    private waveform: WaveSurfer | null = null;

    constructor(props: WaveformProps) {
        super(props);

        this.state = {
            playing: false,
        };
    }

    componentDidMount() {
        const track = document.querySelector("#track");

        this.waveform = WaveSurfer.create({
            barWidth: 1,
            barRadius: 1,
            barGap: 5,
            barMinHeight: 20,
            cursorWidth: 1,
            container: "#waveform",
            backend: "WebAudio",
            height: 80,
            progressColor: "#EF174B",
            responsive: true,
            waveColor: "#C4C4C4",
            cursorColor: "transparent",
        });

        if (this.waveform && track instanceof HTMLMediaElement) {
            this.waveform.load(track);
        }
    }

    componentDidUpdate(prevProps: WaveformProps) {
        // eslint-disable-next-line react/destructuring-assignment
        if (prevProps.url !== this.props.url) {
            const track = document.querySelector("#track");
            if (this.waveform && track instanceof HTMLMediaElement) {
                this.waveform.load(track);
            }
        }
    }

    handlePlay = () => {
        if (this.waveform) {
            this.setState(prevState => ({
                playing: !prevState.playing,
            }));

            this.waveform.playPause();
            this.waveform.on("finish", () => {
                this.setState({ playing: false });
            });
        }
    };

    render() {
        const { url } = this.props;
        const { theme } = this.props;
        const { playing } = this.state;
        return (
            <WaveformContianer theme={theme}>
                <PlayButton onClick={this.handlePlay} theme={theme}>
                    {!playing ? (
                        <FaPlay color="#EF174B" style={{ fontSize: "35px" }} />
                    ) : (
                        <FaPause color="#EF174B" style={{ fontSize: "35px" }} />
                    )}
                </PlayButton>
                <Wave id="waveform" theme={theme} />
                <audio id="track" src={url} />
            </WaveformContianer>
        );
    }
}

export default Waveform;
