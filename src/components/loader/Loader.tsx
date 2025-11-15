import { LoadingOverlay } from "@mantine/core";

const customLoader = (
    <svg
        width="54"
        height="54"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="red"
    >
        <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>
        </g>
    </svg>
);
function Loader() {
    return (
        <LoadingOverlay
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& .mantine-Overlay-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.50)",
                },
            }}
            loader={customLoader}
            visible
        />
    );
}
export default Loader;
