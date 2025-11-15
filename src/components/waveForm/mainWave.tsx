import { useMantineTheme } from "@mantine/core";
import Waveform from "./waveForm";

function MainComponent({ url }: { url: string }) {
    const theme = useMantineTheme();
    return <Waveform theme={theme} url={url} />;
}

export default MainComponent;
