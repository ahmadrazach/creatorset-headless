import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import useStyles from "./styles";

function IconList() {
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 800px)");

    return (
        <Container
            fluid
            className={`${
                matches ? classes.containerMobile : classes.container
            } ${classes.w100}`}
        >
            <div className="mx-5">
                <Image
                    src="/images/Adobe.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">Adobe</h6>
            </div>
            <div className="mx-5">
                <Image
                    src="/images/Capcut.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">Capcut</h6>
            </div>
            <div className="mx-5">
                <Image
                    src="/images/VegasPro.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">Vega Pro</h6>
            </div>
            <div className="mx-5">
                <Image
                    src="/images/OBS.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">OBS</h6>
            </div>
            <div className="mx-5">
                <Image
                    src="/images/Mobile.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">Mobile</h6>
            </div>
            <div className="mx-5">
                <Image
                    src="/images/iMovie.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">iMovie</h6>
            </div>
            <div className="mx-5">
                <Image
                    src="/images/FinalCut.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">Final Cut</h6>
            </div>
            <div className="mx-5">
                <Image
                    src="/images/Davinci.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">Davinci</h6>
            </div>
            <div className="mx-5">
                <Image
                    src="/images/Filmora.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">Filmora</h6>
            </div>
            <div className="mx-5">
                <Image
                    src="/images/Avid.svg"
                    width={92}
                    height={92}
                    alt="Adobe"
                />
                <h6 className="text-center pt-2">Avid</h6>
            </div>
        </Container>
    );
}

export default IconList;
